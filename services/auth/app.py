import datetime
import os

import bcrypt
import jwt
from flask import Flask, jsonify, request
from flask_cors import CORS

from db import SessionLocal, engine
from models import Base, User

Base.metadata.create_all(bind=engine)

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv("JWT_SECRET", "fallback")


@app.route('/api/auth/register', methods=['POST'])
def register():
    session = SessionLocal()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if session.query(User).filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = User(email=email, password=hashed.decode('utf-8'))
    session.add(user)
    session.commit()
    session.close()
    return jsonify({"message": "User registered successfully"}), 201


@app.route('/api/auth/login', methods=['POST'])
def login():
    session = SessionLocal()
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = session.query(User).filter_by(email=email).first()
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }, app.config['SECRET_KEY'], algorithm="HS256")
    session.close()
    return jsonify({"token": token})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
