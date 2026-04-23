from flask import Blueprint, request, jsonify
import base64
import json
from datetime import datetime
signups = Blueprint("signup", __name__)

@signups.route("/signup", methods=["POST","GET"])
def signup():
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc3Mjk2NTE1NSwianRpIjoiZTg0ZDI1MzYtOWFkYS00NWFhLTk1MmQtOTU5OTM3Mzg4ZTVlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjY5YWQ0ZDIzZDFkMTQxNTc4OWVkZjUzMyIsIm5iZiI6MTc3Mjk2NTE1NSwiY3NyZiI6IjUwNmUyZTMxLTdkYTgtNGZlOC05OTAxLTljNDg4Zjg1ODJjNSIsImV4cCI6MTgwNDUwMTE1NX0.mMMThE7ixfJfJNp6zQc8KrcUFDOP8qwN4prkyhJm9jw"
    payload = token.split('.')[1]
    payload += '=' * (-len(payload) % 4)

# Decode
    decoded = base64.urlsafe_b64decode(payload)
    data = json.loads(decoded)

# Expiration
    exp_timestamp = data['exp']
    exp_time = datetime.utcfromtimestamp(exp_timestamp)
    print("Token expires at (UTC):", exp_time)

# Check if expired
    if datetime.utcnow() > exp_time:
      return jsonify({"mssg":"token is expired"}),200
    else:
       print("Token is valid.")