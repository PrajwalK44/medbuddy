import os
import base64
import hmac
import hashlib
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
from bson.binary import Binary  

# Generate random keys (DO NOT HARDCODE)
KEY = base64.b64decode(os.getenv("ENCRYPTION_KEY"))
HMAC_KEY = base64.b64decode(os.getenv("HMAC_KEY"))

def encrypt_data(plain_text: str) -> str:
    """
    Encrypts the given plain text using AES-256-CBC encryption with a random IV.
    Computes an HMAC to ensure integrity and prevent tampering.
    Returns the base64-encoded (IV + encrypted data + HMAC).
    """
    iv = os.urandom(16)  # Generate a random IV

    # Convert plain text to bytes
    plain_text_bytes = plain_text.encode('utf-8')

    # Create AES cipher in CBC mode
    cipher = Cipher(algorithms.AES(KEY), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()

    # Apply PKCS7 padding
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(plain_text_bytes) + padder.finalize()

    # Encrypt the padded data
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()

    # Compute HMAC for integrity
    mac = hmac.new(HMAC_KEY, iv + encrypted_data, hashlib.sha256).digest()

    # Return base64-encoded (IV + encrypted data + HMAC)
    return base64.b64encode(iv + encrypted_data + mac).decode()


def fix_base64_padding(base64_string: str) -> str:
    """
    Fix base64 padding by adding the correct number of '=' characters.
    """
    padding_needed = len(base64_string) % 4
    if padding_needed:
        base64_string += '=' * (4 - padding_needed)
    return base64_string


def decrypt_data(encrypted_data: str) -> str:
    """
    Decrypts AES-256 encrypted data with HMAC verification.
    Supports both binary and base64-encoded encrypted data.
    """
    if isinstance(encrypted_data, Binary):  # Handle MongoDB Binary format
        encrypted_data = encrypted_data.decode('utf-8')

    # Convert from Base64
    try:
        encrypted_data = base64.b64decode(encrypted_data)
    except Exception as e:
        raise ValueError(f"Failed to decode base64: {e}")

    # Validate data length (must contain IV + at least 16 bytes + HMAC)
    if len(encrypted_data) < 48:  # 16 bytes IV + encrypted data + 32 bytes HMAC
        raise ValueError("Encrypted data is too short or corrupted.")

    # Extract IV (first 16 bytes)
    iv = encrypted_data[:16]

    # Extract HMAC (last 32 bytes)
    received_hmac = encrypted_data[-32:]

    # Extract actual encrypted data (excluding IV and HMAC)
    actual_encrypted_data = encrypted_data[16:-32]

    # Verify HMAC
    computed_hmac = hmac.new(HMAC_KEY, iv + actual_encrypted_data, hashlib.sha256).digest()
    if not hmac.compare_digest(computed_hmac, received_hmac):
        raise ValueError("HMAC verification failed! Possible tampering detected.")

    # Create AES cipher
    cipher = Cipher(algorithms.AES(KEY), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()

    try:
        # Decrypt data
        decrypted_padded = decryptor.update(actual_encrypted_data) + decryptor.finalize()

        # Remove PKCS7 padding
        unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
        decrypted_data = unpadder.update(decrypted_padded) + unpadder.finalize()

        return decrypted_data.decode('utf-8')
    except Exception as e:
        raise ValueError(f"Decryption failed: {e}")


def encrypt_profile_data(profile):
    """
    Recursively encrypts all values in a dictionary, list, or scalar type while preserving data types.
    """
    if isinstance(profile, dict):
        return {key: encrypt_profile_data(value) for key, value in profile.items()}
    elif isinstance(profile, list):
        return [encrypt_profile_data(item) for item in profile]
    elif profile is None:
        return None
    elif isinstance(profile, bool):
        return encrypt_data(str(profile))  # Convert boolean to string before encryption
    elif isinstance(profile, (int, float, str)):
        return encrypt_data(str(profile))  # Convert numbers to strings before encryption
    else:
        raise TypeError(f"Unsupported data type: {type(profile)}")

def decrypt_profile_data(profile):
    """Recursively decrypt all values, handling bytes and restoring original data types."""
    if isinstance(profile, dict):
        return {key: decrypt_profile_data(value) for key, value in profile.items()}
    elif isinstance(profile, list):
        return [decrypt_profile_data(item) for item in profile]
    elif profile is None:
        return None
    elif isinstance(profile, bytes):  # Handle raw bytes
        try:
            decrypted_value = decrypt_data(profile)  # Decrypt bytes directly
            return convert_to_original_type(decrypted_value)  # Convert back to correct type
        except Exception as e:
            print(f"Error decrypting bytes data: {e}")
            return profile  # Return as is if decryption fails
    elif isinstance(profile, str):  # Handle encrypted strings (if stored as base64)
        try:
            decrypted_value = decrypt_data(profile)
            return convert_to_original_type(decrypted_value)  # Convert back to correct type
        except ValueError as e:
            print(f"Error while decrypting '{profile}': {e}")
            return profile
    else:
        return profile

def convert_to_original_type(value):
    """Convert decrypted string back to its original type (int, float, bool, str)."""
    if value == "True":
        return True
    elif value == "False":
        return False
    try:
        return int(value) if value.isdigit() else float(value)
    except ValueError:
        return value  # Return as string if not a number

