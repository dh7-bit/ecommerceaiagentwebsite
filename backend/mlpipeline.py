import pandas as pd
from pymongo import MongoClient
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from dotenv import load_dotenv
from db import orders_collection
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.environ.get("MONGO_URI")

client = MongoClient(MONGO_URI)
first=client.amazonuserclusters 
second=first.userclusters

import os

# -----------------------------


# -----------------------------
# 2. GET ONLY PAID ORDERS
# -----------------------------
orders = list(orders_collection.find({"status": "paid"}))

# -----------------------------
# 3. CONVERT ORDERS → FLAT DATA
# -----------------------------
rows = []

for order in orders:
    user_id = order["user_id"]

    for item in order["items"]:
        rows.append({
            "user_id": user_id,
            "price": item.get("price", 0),
            "quantity": item.get("quantity", 1),
            "order_amount": order.get("amount", 0)
        })

df = pd.DataFrame(rows)
user_df = df.groupby("user_id").agg({
    "price": "sum",
    "quantity": "sum",
    "order_amount": "mean"
})

user_df.columns = ["total_spent", "total_items", "avg_order_value"]
user_df = user_df.reset_index()
X = user_df[["total_spent", "total_items", "avg_order_value"]]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
kmeans = KMeans(n_clusters=1, random_state=42)
user_df["cluster"] = kmeans.fit_predict(X_scaled)

print(user_df)
for _, row in user_df.iterrows():
    second.update_one(
        {"user_id": row["user_id"]},
        {"$set": {
            "cluster": int(row["cluster"]),
            "total_spent": float(row["total_spent"]),
            "total_items": int(row["total_items"]),
            "avg_order_value": float(row["avg_order_value"])
        }},
        upsert=True
    )