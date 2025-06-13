import firebase_admin
from firebase_admin import credentials, messaging

# Initialize Firebase Admin SDK only if not already initialized
if not firebase_admin._apps:
    cred = credentials.Certificate("../backend/app/utils/pushnotificationsinvictus-firebase-adminsdk-fbsvc-0970a4e463.json")
    firebase_admin.initialize_app(cred)

def send_push_notification(fcm_token, title, body):
    """
    Sends a push notification to only the first valid FCM token in the list.
    """
    if not fcm_token:
        print("No FCM tokens provided.")
        return 0  
    
    
    try:
        print(f"Sending notification to token: {fcm_token}")
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body
            ),
            token=fcm_token  # Send to a single token
        )
        response = messaging.send(message)
        print(f"Successfully sent notification to {fcm_token}: {response}")
        return 1  # One message sent successfully
    except Exception as e:
        print(f"Failed to send notification to {fcm_token}: {e}")
        return 0  # No messages sent
