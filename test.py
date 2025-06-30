from kafka import KafkaProducer
import json

print("Initializing Kafka Producer...")
producer = KafkaProducer(bootstrap_servers='kafka:9092', value_serializer=lambda v: json.dumps(v).encode('utf-8'))
print(f"\n\n📡 Kafka Producer Initialized: {producer}")

producer.send('threadly.notifications', {"type": "new_message", "content": "chutiye"})
print("✅ Message sent to Kafka topic 'threadly.notifications'")
producer.flush()
