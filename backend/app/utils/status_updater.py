from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from pymongo import UpdateOne
from app.utils.encryption import encrypt_data, decrypt_profile_data, decrypt_data
from app.database import mongo
from app.utils.notification import send_missed_medication_notification

scheduler = BackgroundScheduler()

def convert_to_24_hour(time_str):
    """Converts '08:00 AM' format to 'HH:MM' 24-hour format."""
    return datetime.strptime(time_str, "%I:%M %p").strftime("%H:%M")

def update_missed_medications():
    """Updates medications whose time has passed but status is still 'upcoming' to 'missed' and notifies caregivers."""
    
    current_time = datetime.now().strftime("%H:%M")  # Get current time in 24-hour format
    
    # Find all upcoming medications
    upcoming_medications = list(mongo.db.medications.find({"status": "upcoming"}))
    
    update_operations = []
    
    for med in upcoming_medications:
             
        # Convert stored medication time to 24-hour format
        med_time_24hr = convert_to_24_hour(decrypt_data(med["time"]))
        
        # Compare medication time with current time
        if med_time_24hr < current_time:
            
            update_operations.append(
                UpdateOne({"_id": med["_id"]}, {"$set": {"status": "missed"}})
            )

            # Call notification function with user_id and medication name
            # send_missed_medication_notification(med["user_id"], decrypt_data(med["name"]))
    
    # Bulk update all medications that need a status change
    if update_operations:
        mongo.db.medications.bulk_write(update_operations)
        print(f"Updated {len(update_operations)} medications to 'missed'.")

# Schedule the job to run every 1 minute
scheduler.add_job(update_missed_medications, "interval", minutes=1)
scheduler.start()

# Ensure the scheduler shuts down properly on exit
import atexit
atexit.register(lambda: scheduler.shutdown(wait=False))
