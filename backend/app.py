import os
from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from signup import signups
import requests
from datetime import timedelta
from db import users_collection

# ---------------------------
# Load environment variables
# ---------------------------
load_dotenv()
MONGO_URI = os.environ.get("MONGO_URI")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
FRONTEND_URL = os.environ.get("FRONTEND_URL")  # e.g., https://amazon-clones-rrdp.onrender.com

# ---------------------------
# Flask App & CORS Setup
# ---------------------------
app = Flask(__name__)
CORS(
    app,
    origins=[FRONTEND_URL],
    supports_credentials=True,
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"]
)

# ---------------------------
# Add COOP / COEP headers for Google Sign-In popup
# ---------------------------
@app.after_request
def add_security_headers(response):
    response.headers['Cross-Origin-Opener-Policy'] = 'same-origin-allow-popups'
    response.headers['Cross-Origin-Embedder-Policy'] = 'require-corp'
    return response

# ---------------------------
# JWT Setup
# ---------------------------
app.config['JWT_SECRET_KEY'] = JWT_SECRET_KEY
jwt = JWTManager(app)


# ---------------------------
# Google Sign-up / Sign-in
# ---------------------------
@app.route('/google-signup', methods=['POST', 'OPTIONS'])
def google_signup():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return '', 200

    data = request.json
    id_token = data.get('id_token')

    if not id_token:
        return jsonify({"msg": "ID token required"}), 400

    # Verify token with Google
    response = requests.get(f"https://oauth2.googleapis.com/tokeninfo?id_token={id_token}")
    if response.status_code != 200:
        return jsonify({"msg": "Invalid Google token"}), 401

    user_info = response.json()
    email = user_info.get('email')
    name = user_info.get('name')

    # Check if user exists
    user = users_collection.find_one({"email": email})
    if not user:
        # New user → create in DB
        result = users_collection.insert_one({"email": email, "name": name, "google_signup": True})
        user_id = str(result.inserted_id)
    else:
        # Existing user → use existing id
        user_id = str(user['_id'])

    # Create JWT token
    access_token = create_access_token(identity=user_id,expires_delta=timedelta(days=365)) # 1 year)
    return jsonify({"access_token": access_token, "email": email, "name": name})


app.register_blueprint(signups)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=True)
