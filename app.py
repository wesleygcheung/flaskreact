from app import app, socketio

if __name__ == '__main__':
    socketio.run(app, debug=False,host='0.0.0.0') # Swap between dev and prod via debug