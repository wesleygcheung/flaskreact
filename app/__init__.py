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
from flask_sqlalchemy import SQLAlchemy

#### App Initializations ####

### Initialize Flask App and Configurations ###
load_dotenv()
app = Flask(__name__,static_folder='../frontend/build',static_url_path='') # static folder must point to React build directory
app.config['SECRET_KEY'] = secrets.token_urlsafe(16)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL').replace("postgres://", "postgresql://", 1)

### Initialize PostgreSQL DB ###
db = SQLAlchemy()
db.init_app(app)

### Initialize to allow CORS with React ###
CORS(app,resources={r"/*":{"origins":"*"}})

### Setup Firebase admin to enable JWT token verification ###
firebase_config = os.getenv('FBASE_CONFIG') # Firebase console configuration is encoded as a base64 string via OpenSSL and stored in .env
firebase_config_decoded = json.loads(base64.b64decode(firebase_config)) # Decode the Firebase config back to a JSON
cred = credentials.Certificate(firebase_config_decoded) # Generate a credentials certificate from the config
firebase_app = firebase_admin.initialize_app(credentials.Certificate(firebase_config_decoded)) # Initialize Firebase using the credentials

### Initialize SocketIO ###
socketio = SocketIO(app, cors_allowed_origins="*")

from app import routes