from bson import ObjectId
from datetime import datetime
from app.database import mongo
from app.utils.firebase_config import send_push_notification 
from app.utils.encryption import decrypt_data

def send_missed_medication_notification(user_id, medication_name):
    """
    Sends a push notification to the caregiver if a patient's medication is missed
    and stores the notification details in MongoDB.
    """
    # Fetch patient details
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    if not user or user.get("role") != "patient":
        return "Invalid patient user."

    # Extract patient name
    patient_name = user.get("name", "Unknown Patient")

    # Find caregiver assigned to this patient
    caregiver = mongo.db.users.find_one({"profile.patients_assigned": user_id})

    # Check if caregiver is found
    if not caregiver:
        print(f"No caregiver assigned to patient {user_id}. Notification not sent.")
        return

    # Extract caregiver FCM token and ID
    caregiver_fcm_token = caregiver.get("profile", {}).get("fcm_token")
    caregiver_id = str(caregiver["_id"])

    if not caregiver_fcm_token:
        print(f"No valid FCM token found for caregiver of patient {user_id}.")
        return

    # Prepare notification content
    title = f"Missed Medication Alert: {medication_name} for {patient_name}"
    body = f"{patient_name} (Patient ID: {user_id}) has missed their scheduled medication: {medication_name}. Please follow up accordingly."

    # Send push notification via Firebase
    success_count = send_push_notification(caregiver_fcm_token, title, body)

    # Store notification details in MongoDB
    notification_entry = {
        "patient_id": str(user_id),
        "caregiver_id": caregiver_id,
        "medication_name": medication_name,
        "title": title,
        "body": body,
        "timestamp": datetime.utcnow(),
        "status": "sent" if success_count > 0 else "failed"
    }

    mongo.db.notifications.insert_one(notification_entry)

    print(f"Notification sent to caregiver {caregiver_id} for missed medication: {medication_name}")
