from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os
from app.database import mongo

# Load environment variables
load_dotenv()

# Initialize Flask extensions
login_manager = LoginManager()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable Cross-Origin Resource Sharing

    # Set Flask Config
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")  # MongoDB URI from .env
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")  # For JWT Authentication

    # Initialize extensions
    mongo.init_app(app)
    login_manager.init_app(app)
    jwt.init_app(app)

    # Import and register blueprints inside the function
    from app.routes.auth_routes import auth_bp
    from app.routes.profile_routes import profile_bp
    from app.routes.medication_routes import medication_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(profile_bp, url_prefix="/profile")
    app.register_blueprint(medication_bp, url_prefix="/medication")

    # Define user loader for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        return mongo.db.users.find_one({"_id": user_id})  # Use ObjectId if needed

    return app
