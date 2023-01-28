from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import secrets
import os
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials
import base64
import json

#### App Initializations ####

### Initialize Flask App and Configurations###
load_dotenv()
app = Flask(__name__,static_folder='../frontend/build',static_url_path='')

CORS(app,resources={r"/*":{"origins":"*"}})
app.config['SECRET_KEY'] = secrets.token_urlsafe(16)
firebase_config = os.getenv('FBASE_CONFIG')
firebase_config_decoded = json.loads(base64.b64decode(firebase_config))
cred = credentials.Certificate(firebase_config_decoded)

firebase_app = firebase_admin.initialize_app(credentials.Certificate(firebase_config_decoded))

### Initialize SocketIO ###
socketio = SocketIO(app, cors_allowed_origins="*")

### Swap Debug Mode / Development DB vs. Production Mode / Production DB ###

from app import routes