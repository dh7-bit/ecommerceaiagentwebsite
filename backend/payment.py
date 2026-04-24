from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import razorpay
import os
import hmac
import hashlib
from db import orders_collection
payment_bp = Blueprint("payment", __name__)

RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))



@payment_bp.route("/create-order", methods=["POST"])
@jwt_required()
def create_order():
    data = request.json
    amount = data.get("amount")
    cart = data.get("cart")

    try:
        order = client.order.create({
            "amount": float(amount),
            "currency": "INR",
            "payment_capture": 1
        })

        user_id = get_jwt_identity()

        orders_collection.insert_one({
            "user_id": user_id,
            "items": cart,
            "amount": amount,
            "status": "pending",
            "razorpay_order_id": order["id"]
        })

        return jsonify(order)

    except Exception as e:
        return jsonify({"error": str(e)}), 500






@payment_bp.route("/verify", methods=["POST"])
@jwt_required()
def verify_payment():
    data = request.json

    razorpay_order_id = data.get("razorpay_order_id")
    razorpay_payment_id = data.get("razorpay_payment_id")
    razorpay_signature = data.get("razorpay_signature")

    body = f"{razorpay_order_id}|{razorpay_payment_id}"

    generated_signature = hmac.new(
        bytes(RAZORPAY_KEY_SECRET, "utf-8"),
        bytes(body, "utf-8"),
        hashlib.sha256
    ).hexdigest()

    if generated_signature == razorpay_signature:

        orders_collection.update_one(
            {"razorpay_order_id": razorpay_order_id},
            {
                "$set": {
                    "status": "paid",
                    "payment_id": razorpay_payment_id
                }
            }
        )

        return jsonify({"status": "success"})

    return jsonify({"status": "failed"}), 400        