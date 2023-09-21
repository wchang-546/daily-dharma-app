# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_session import Session

# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.secret_key= b'\xef>\xc3r6\x85j\x82\xfbg@\xdfz\xca\xea\xc6'
app.config['SECRET_KEY'] = '\xef>\xc3r6\x85j\x82\xfbg@\xdfz\xca\xea\xc6'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['REMEMBER_COOKIE_DOMAIN']= "http://localhost:3000/"
app.config["SESSION_COOKIE_SECURE"] = True
app.config["SESSION_COOKIE_SAMESITE"] = 'None'

app.json.compact = False

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)
db.init_app(app)

# Instantiate BCrypt 
bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)

# # Instantiate CORS
CORS(app, origins=['http://localhost:3000'], supports_credentials=True)
