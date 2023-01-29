from app import app, socketio
from firebase_admin import auth
from flask_socketio import emit
from flask import request, jsonify, send_from_directory


### App will serve up index.html from the React build directory ###
@app.route('/')
def serve():
    print("Home path")
    return send_from_directory(app.static_folder, 'index.html')

### Test API call ###
@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data':'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)

### API call to authenticate Firebase token ###
@app.route('/API/authenticate',methods = ['GET','POST'])
def api_authenticate():
    header = request.headers
    auth_token = auth.verify_id_token(header['Authorization'])
    print(f"User ID: {auth_token['uid']}")
    data = {'data':f"Auth Received for {auth_token['uid']}"}
    return jsonify(data)

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
    print(f"message: {data[0]}, user_id: {data[1]}")
    emit("data",{'data':data,'id':request.sid},broadcast=True)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)

    