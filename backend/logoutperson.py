from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from db import users_collection
from  flask import request
logouts = Blueprint("logout", __name__)

@logouts.route("/logout", methods=["POST", "OPTIONS"])
@jwt_required()  # ensures request has a valid token
def logout():
    if request.method == "OPTIONS":
        return '', 200

    try:
        # Get user_id from JWT token
        user_id = get_jwt_identity()

        # Delete user from MongoDB
        result = users_collection.delete_one({"_id": ObjectId(user_id)})

        if result.deleted_count == 1:
            return jsonify({"msg": f"User {user_id} deleted and logged out successfully"}), 200
        else:
            return jsonify({"msg": "User not found"}), 404

    except Exception as e:
        return jsonify({"msg": "Unauthorized or something went wrong", "error": str(e)}), 401