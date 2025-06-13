import jwt
from functools import wraps
from flask import request, jsonify, current_app
from datetime import datetime, timedelta
from flask import current_app

def jwt_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        try:
            token = token.split("Bearer ")[1]  # Remove "Bearer " prefix
            decoded_token = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            request.user_id = decoded_token["user_id"]
            request.role = decoded_token["role"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function



def generate_jwt(user_id, role):
    """
    Generate a JWT token for authentication.
    """
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=2)  # Token expires in 2 hours
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
