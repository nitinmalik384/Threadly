import eventlet
eventlet.monkey_patch()

from flask import Flask
from kafka import KafkaConsumer
import os
import json
from dotenv import load_dotenv
from flask_socketio import SocketIO

# Load environment variables
load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

KAFKA_BOOTSTRAP_SERVERS = os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'kafka:9092')
KAFKA_TOPIC = os.getenv('KAFKA_NOTIFICATION_TOPIC', 'threadly.notifications')

def consume_kafka():
    with app.app_context():
        consumer = KafkaConsumer(
            KAFKA_TOPIC,
            bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
            group_id='notification-service-group',
            value_deserializer=lambda m: json.loads(m.decode('utf-8'))
        )

        print(f"📥 Kafka consumer started on topic: {KAFKA_TOPIC}")

        for message in consumer:
            print(f"✅ Kafka Message: {message.value}")
            # Safe emit inside eventlet context
            socketio.emit('new_notification', message.value)

@app.route("/health", methods=["GET"])
def health_check():
    return {"status": "Notification Service Running"}, 200

if __name__ == "__main__":
    # Start kafka consumer in eventlet background task
    socketio.start_background_task(target=consume_kafka)
    socketio.run(app, host='0.0.0.0', port=5003, allow_unsafe_werkzeug=True)
