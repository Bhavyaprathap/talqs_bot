# database.py

from pymongo import MongoClient
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Load environment variables
load_dotenv()

# MongoDB connection URI
MONGODB_URI = os.getenv("mongodb+srv://bhavyaprathapreddy:FpEzcSR9sedWMHUQ@cluster0.igja1rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# Connect to MongoDB
client = MongoClient(MONGODB_URI)

# Access the database
db = client["talqs"]  # Change this to your database name

# Access the collection
users_collection = db["users"]  # This is the 'users' collection you are using
