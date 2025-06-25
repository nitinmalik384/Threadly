from flask import Flask, request, jsonify
from db import SessionLocal, engine
from models import Base, Message, Channel
from flask_cors import CORS


# DB Table create karna (only first time - auto migrate)
Base.metadata.create_all(bind=engine)

app = Flask(__name__)
CORS(app)

# Health check
@app.route('/api/messaging/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Messaging Service is running"}), 200

# Send Message Endpoint
@app.route('/api/messaging/send', methods=['POST'])
def send_message():
    session = SessionLocal()
    data = request.get_json()

    try:
        new_message = Message(
            user_id=data['user_id'],
            channel_id=data['channel_id'],
            content=data['content'],
            parent_message_id=data.get('parent_message_id')  # Optional
        )
        session.add(new_message)
        session.commit()

        return jsonify({"message": "Message sent successfully"}), 201

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        session.close()

# Get all messages in a channel
@app.route('/api/messaging/channel/<int:channel_id>', methods=['GET'])
def get_channel_messages(channel_id):
    session = SessionLocal()
    try:
        messages = session.query(Message).filter_by(channel_id=channel_id).all()
        result = [{
            "id": m.id,
            "user_id": m.user_id,
            "content": m.content,
            "parent_message_id": m.parent_message_id,
            "created_at": m.created_at.isoformat()
        } for m in messages]

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        session.close()

# Get thread replies (all replies for a given message id)
@app.route('/api/messaging/thread/<int:message_id>', methods=['GET'])
def get_thread_messages(message_id):
    session = SessionLocal()
    try:
        messages = session.query(Message).filter_by(parent_message_id=message_id).all()
        result = [{
            "id": m.id,
            "user_id": m.user_id,
            "content": m.content,
            "created_at": m.created_at.isoformat()
        } for m in messages]

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        session.close()

@app.route('/api/messaging/channels', methods=['GET'])
def get_channels():
    session = SessionLocal()
    try:
        channels = session.query(Channel).all()
        result = [{"id": c.id, "name": c.name} for c in channels]
        return jsonify(result), 200
    finally:
        session.close()

@app.route('/api/messaging/channels', methods=['POST'])
def create_channel():
    session = SessionLocal()
    data = request.get_json()
    try:
        new_channel = Channel(name=data['name'])
        session.add(new_channel)
        session.commit()
        return jsonify({"message": "Channel created"}), 201
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        session.close()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
