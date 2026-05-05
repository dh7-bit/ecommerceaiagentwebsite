🛒 AI-Powered E-Commerce Platform with Customer Segmentation

An intelligent e-commerce system that integrates machine learning–based customer segmentation, behavior-driven product recommendations, and secure payment processing.

🚀 Features
🧠 AI-Based Customer Segmentation
Uses K-Means clustering to group users based on purchase behavior
🎯 Personalized Recommendations
Suggests products based on similar users within the same cluster
🛍️ Full E-Commerce Workflow
Product browsing, cart management, and order placement
💳 Payment Integration
Secure payments using Razorpay (Test Mode)
🔐 JWT Authentication
Secure user identification and session handling
⚡ State Management
Efficient frontend state handling using Redux
🧠 How It Works
User → JWT Authentication → Fetch User Data
        ↓
Order History → Feature Engineering
        ↓
K-Means Clustering → Assign Cluster
        ↓
Find Similar Users (Same Cluster)
        ↓
Extract Popular Products
        ↓
Filter Already Purchased Items
        ↓
Return Personalized Recommendations
🏗️ Tech Stack
Backend
Python
Flask / Node.js (based on your implementation)
MongoDB
Machine Learning
Scikit-learn (K-Means Clustering)
Pandas, NumPy
Frontend
React.js
Redux
Payment
Razorpay (Test Mode)
📊 Machine Learning Pipeline
Extracted paid orders from MongoDB
Performed feature engineering:
Total spend
Total items purchased
Average order value
Applied StandardScaler for normalization
Used K-Means clustering for segmentation
Stored cluster assignments back into database
📦 Installation
git clone https://github.com/your-username/your-repo.git
cd your-repo
Backend Setup
pip install -r requirements.txt
Frontend Setup
cd frontend
npm install
npm start
⚙️ Environment Variables

Create a .env file:

MONGO_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
JWT_SECRET=your_jwt_secret
▶️ Running the Project
# Backend
python app.py

# Frontend
npm start
📌 Example Use Case
User A and User B belong to the same cluster
User B buys: Shoes + Socks
User A buys: Shoes

👉 System recommends Socks to User A
