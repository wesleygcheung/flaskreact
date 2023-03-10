from app import app, socketio, db
from firebase_admin import auth
from flask_socketio import emit
from flask import request, jsonify, send_from_directory
from app.database import Users

### App will serve up index.html from the React build directory ###
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

### Test API call ###
@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data':'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)

### API call to authenticate Firebase token ###
@app.route('/API/authenticate',methods = ['POST'])
def api_authenticate():
    header = request.headers
    try:
        auth_token = auth.verify_id_token(header['Authorization'])
        user_exists = db.session.query(Users.uid).filter_by(uid=auth_token['uid']).scalar() is not None
        if not user_exists:
            user = Users(uid=auth_token['uid'],name=auth_token['name'],email=auth_token['email'])
            db.session.add(user)
            db.session.commit()
        data = {'data':f"Auth Received for {auth_token['uid']}"}
        return jsonify(data)
    except:
        return jsonify({'data':'Authentication Error'})

@app.route('/API/profile',methods=['POST'])
def api_profile():
    header = request.headers
    try:
        auth_token = auth.verify_id_token(header['Authorization'])
        user = db.session.query(Users).filter_by(uid=auth_token['uid']).scalar()
        if user is not None:
            data = {'data':{'name':user.name,'email':user.email,'uid':user.uid}}
            return jsonify(data)
        else:
            return jsonify({'data':f'Authentication Error: User Does Not Exist'})
    except Exception as e:
        return jsonify({'data':f'Authentication Error: {e}'})

@app.route('/__/auth/<filename>',methods=['GET','POST'])
def sign_in_handler_js(filename):
    if '.js' in filename:
        return send_from_directory("./static", filename)
    else:
        return send_from_directory("./static", f"{filename}.htm")

### Ensure directly accessing React router dom routes will point to React app and not Flask routes ###
@app.errorhandler(404)
def handle_404(e):
    return send_from_directory(app.static_folder, 'index.html')

### SocketIO Listeners ###
@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on('data')
def handle_message(data):
    emit("data",{'data':data[0],'id':request.sid,'displayName':data[1]['displayName']},broadcast=True)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

    