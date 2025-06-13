from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from bson import ObjectId
from pymongo import errors
from app.database import mongo
from app.schemas.medication_schema import MedicationSchema
from app.utils.encryption import encrypt_profile_data, encrypt_data, decrypt_profile_data, decrypt_data
from app.utils.jwt_util import jwt_required

medication_bp = Blueprint('medication', __name__)

@medication_bp.route('/add', methods=['POST'])
@jwt_required
def add_medication():
    """
    Adds a new medication entry for the authenticated user.
    """
    data = request.json
    user_id = request.user_id  # Extracted from JWT

    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    # Validate user existence
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"message": "User not found"}), 404

    try:
        # Validate medication data
        data["user_id"] = str(user_id)  # Ensure user_id is set
        validated_medication = MedicationSchema(**data)
        print(data)
        # Encrypt medication details
        # Extract user_id separately
        user_id = validated_medication.user_id
        status = validated_medication.status

        # Encrypt only the medication data (excluding user_id)
        medication_data = validated_medication.dict(exclude={"user_id", "status"})  # Exclude user_id from encryption
        encrypted_medication = encrypt_profile_data(medication_data)

        # Add `user_id` back to the encrypted structure
        encrypted_medication["user_id"] = str(user_id)  # Ensure `user_id` remains in plaintext
        encrypted_medication["status"] = str(status)  # Ensure `user_id` remains in plaintext

        # Insert into MongoDB
        mongo.db.medications.insert_one(encrypted_medication)


        return jsonify({"message": "Medication added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@medication_bp.route('/get', methods=['GET'])
@jwt_required
def get_medications():
    """Fetches all medications for the authenticated user."""
    try:
        user_id = request.user_id  # Extracted from JWT

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        # Fetch encrypted medications from the database
        encrypted_medications_cursor = mongo.db.medications.find({"user_id": user_id})

        # Convert cursor to list of dictionaries
        encrypted_medications = list(encrypted_medications_cursor)  

        for med in encrypted_medications:
            med["_id"] = str(med["_id"])  # Convert ObjectId to string

        
        # Decrypt all medications at once
        processed_medications = []
        for med in encrypted_medications:
            excluded_fields = {key: med[key] for key in ["user_id", "_id", "status"] if key in med}
            encrypted_data = {k: v for k, v in med.items() if k not in {"user_id", "_id", "status"}}
            
            # Decrypt the remaining data
            decrypted_data = decrypt_profile_data(encrypted_data)
            
            # Merge decrypted data with excluded fields
            decrypted_med = {**excluded_fields, **decrypted_data}
            processed_medications.append(decrypted_med)
        
        return jsonify({"medications": processed_medications}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400

@medication_bp.route('/update_status/<medication_id>', methods=['PUT'])
@jwt_required
def update_medication_status(medication_id):
    """Updates the status of a medication to 'taken' for the authenticated user."""
    try:
        user_id = request.user_id  # Extracted from JWT
        
        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        # Find the medication by ID and user
        medication = mongo.db.medications.find_one({"_id": ObjectId(medication_id), "user_id": user_id})
        
        if not medication:
            return jsonify({"message": "Medication not found"}), 404

        # Update status to "taken"
        mongo.db.medications.update_one(
            {"_id": ObjectId(medication_id)},
            {"$set": {"status": "taken"}}
        )

        return jsonify({"message": "Medication status updated to 'taken'"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 400


@medication_bp.route('/missed', methods=['GET'])
@jwt_required
def send_missed_medication_notifications():
    """
    Fetches all missed medications for the given user and sends notifications to caregivers.
    Returns the names of all missed medications for the user.
    """
    user_id = request.user_id  # Assuming user_id is passed in the request

    # Fetch all missed medications for the user
    missed_medications = mongo.db.medications.find({"user_id": user_id, "status": "missed"})

    missed_meds_names = []

    for med in missed_medications:
        medication_name = decrypt_data(med.get("name"))
        if medication_name:
            missed_meds_names.append(medication_name)

    if not missed_meds_names:
        return jsonify({"message": "No missed medications found for the user."}), 200


    return jsonify({
        "message": "Notifications sent for missed medications.",
        "missed_medications": missed_meds_names
    }), 200

@medication_bp.route('/clear', methods=['DELETE'])
@jwt_required
def delete_medications():
    """
    Fetches all missed medications for the given user, sends notifications to caregivers, 
    and clears them from the database. Returns the names of all missed medications for the user.
    """
    user_id = request.user_id  # Assuming user_id is passed in the request

    # Fetch all missed medications for the user
    missed_medications = mongo.db.medications.find({"user_id": user_id, "status": "missed"})

    missed_meds_names = []

    # Collect the names of missed medications
    for med in missed_medications:
        medication_name = decrypt_data(med.get("name"))
        if medication_name:
            missed_meds_names.append(medication_name)

    # If no missed medications found, return a message
    if not missed_meds_names:
        return jsonify({"message": "No missed medications found for the user."}), 200

    # Clear the missed medications from the database
    mongo.db.medications.delete_many({"user_id": user_id, "status": "missed"})

    # Return the list of missed medications that were cleared
    return jsonify({
        "message": "Missed medications cleared.",
    }), 200

@medication_bp.route('/upcoming', methods=['GET'])
@jwt_required
def upcoming():
    """
    Fetches all missed medications for the given user and sends notifications to caregivers.
    Returns the names of all missed medications for the user.
    """
    user_id = request.user_id  # Assuming user_id is passed in the request

    # Fetch all missed medications for the user
    missed_medications = mongo.db.medications.find({"user_id": user_id, "status": "upcoming"})

    missed_meds_names = []

    for med in missed_medications:
        medication_name = decrypt_data(med.get("name"))
        missed_time = decrypt_data(med.get("time"))  # Assuming timestamp is stored in the document
        if medication_name and missed_time:
            missed_meds_names.append({"name": medication_name, "time": missed_time})


    if not missed_meds_names:
        return jsonify({"message": "No missed medications found for the user."}), 200


    return jsonify({
        "message": "Notifications sent for missed medications.",
        "missed_medications": missed_meds_names
    }), 200


