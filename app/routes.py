from app import app, socketio
from firebase_admin import auth
from flask_socketio import emit
from flask import request, jsonify, send_from_directory


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/http-call")
def http_call():
    """return JSON with string data as the value"""
    data = {'data':'This text was fetched using an HTTP call to server on render'}
    return jsonify(data)

@app.route('/API/authenticate',methods = ['GET','POST'])
def api_authenticate():
    header = request.headers
    print(header['Authorization'])
    auth_status = auth.verify_id_token(header['Authorization'])
    print(auth_status)
    data = {'data':'Auth Received'}
    return jsonify(data)

@socketio.on("connect")
def connected():
    """event listener when client connects to the server"""
    print(request.sid)
    print("client has connected")
    emit("connect",{"data":f"id: {request.sid} is connected"})

@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ",str(data))
    emit("data",{'data':data,'id':request.sid},broadcast=True)

@socketio.on("disconnect")
def disconnected():
    """event listener when client disconnects to the server"""
    print("user disconnected")
    emit("disconnect",f"user {request.sid} disconnected",broadcast=True)