from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.database import mongo
from app.schemas.user_schema import UserSchema
from app.utils.jwt_util import generate_jwt, jwt_required
from bson.objectid import ObjectId
from app.utils.encryption import encrypt_profile_data, decrypt_data, encrypt_data

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json

    try:
        validated_data = UserSchema(**data)
    except Exception as e:
        return jsonify({'error': 'Invalid input', 'details': str(e)}), 400

    if mongo.db.users.find_one({"email": validated_data.email}):  # Search by plaintext email
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password (DO NOT ENCRYPT anything else)
    hashed_password = generate_password_hash(validated_data.password)

    # Prepare user data
    user_data = validated_data.dict()
    user_data["password"] = hashed_password  # Only hash the password

    # Insert into MongoDB without encrypting any fields
    mongo.db.users.insert_one(user_data)

    return jsonify({'message': 'User registered successfully'}), 201



@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json

    user = mongo.db.users.find_one({"email": data["email"]})  # Search by plaintext email

    if user and check_password_hash(user['password'], data['password']):
        access_token = generate_jwt(str(user['_id']), user['role'])  # No decryption needed
  
        return jsonify({
            "access_token": access_token,
            "name": user["name"],
        })

    return jsonify({'message': 'Invalid credentials'}), 401


@auth_bp.route('/logout', methods=['POST'])
@jwt_required
def logout():
    return jsonify({"message": "Logout successful"}), 200
