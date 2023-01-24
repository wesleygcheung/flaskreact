from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import secrets
import os

#### App Initializations ####

### Initialize Flask App and Configurations###
app = Flask(__name__,static_url_path='')
CORS(app,resources={r"/*":{"origins":"*"}})
app.config['SECRET_KEY'] = secrets.token_urlsafe(16)

### Initialize SocketIO ###
socketio = SocketIO(app, cors_allowed_origins="*")

### Swap Debug Mode / Development DB vs. Production Mode / Production DB ###

from app import routes