from flask import Blueprint, request, jsonify
from app.database import mongo
from bson.objectid import ObjectId
from app.schemas.user_schema import ProfileSchema
from app.schemas.patient_schema import PatientProfileSchema
from app.schemas.caregiver_schema import CaregiverProfileSchema
from app.utils.jwt_util import jwt_required
from app.utils.encryption import encrypt_profile_data , encrypt_data, decrypt_data, decrypt_profile_data# Import encryption function

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/register', methods=['POST'])
@jwt_required
def register_profile():
    """Registers a user's profile after authentication, validating based on role"""
    data = request.json
    user_id = request.user_id  # Extracted from JWT in jwt_util
    role = request.role  # Extracted from JWT

    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    # Fetch user from database
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Ensure role is currently "general" before updating
    if user['role'] != "general":
        return jsonify({"message": "Profile already registered"}), 403

    print(data["profile"])

    try:
        # Validate profile based on role
        if data["role"] == "patient":
            print(data["profile"])
            validated_data = PatientProfileSchema(**data["profile"])
            profile_data = encrypt_profile_data(validated_data.dict())  # Encrypt for patients
        elif data["role"] == "caregiver":
            # Remove unwanted fields before validation
            patient_email = data["profile"].pop("email", None)  # Extract and remove email
            data["profile"].pop("name", None)  # Remove name if present to avoid Pydantic errors

            if not patient_email:
                return jsonify({"message": "Patient email is required"}), 400

            # Validate remaining profile data with Pydantic
            validated_data = CaregiverProfileSchema(**data["profile"])
            profile_data = validated_data.dict()  # No encryption for caregivers

            # Find patient by email
            patient = mongo.db.users.find_one({"email": patient_email, "role": "patient"})
            if not patient:
                return jsonify({"message": "Patient with this email not found"}), 404

            assigned_patient_id = str(patient["_id"])  # Convert ObjectId to string

            # Add the assigned patient ID to profile
            profile_data["patients_assigned"] = assigned_patient_id

        else:
            return jsonify({"message": "Invalid role"}), 400

        # Update user role and store profile in database
        mongo.db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {
                "role": data["role"],  # Store role without encryption
                "profile": profile_data  # Store profile based on role
            }}
        )

        return jsonify({"message": "Profile registered successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400



@profile_bp.route('/get-profile', methods=['GET'])
@jwt_required
def get_profile():
    """Retrieves a user's profile after authentication, decrypting only if the role is 'patient'."""
    user_id = request.user_id  # Extracted from JWT in jwt_util

    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    try:
        # Fetch user from the database
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Get role
        role = user.get("role", "")
        if role == "general":
            return jsonify({"message": "Profile not registered"}), 403

        # Decrypt profile data only for patients
        profile_data = user.get("profile", {})
        if role == "patient":
            user = decrypt_profile_data(user)

        return jsonify({
            "role": role,
            "user": user
        }), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500



