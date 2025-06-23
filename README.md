# 🧵 Threadly

Threadly is a modern, real-time, event-driven messaging platform designed with microservices architecture. It empowers teams and communities to collaborate via channel-based messaging, threaded conversations, file sharing, and instant notifications.

> Built using React, Express, Flask, PostgreSQL, Kafka, Docker, and Kubernetes.

---

## 🚀 Features

* ✅ User Authentication & Authorization (JWT)
* ✅ Channel & Team Management
* ✅ Threaded Conversations
* ✅ Real-Time Messaging (WebSocket)
* ✅ File Upload & Sharing (S3 compatible)
* ✅ In-App & Email Notifications
* ✅ Full-text Search
* ✅ Audit Logging
* ✅ Scalable Microservice Architecture

---

## 🧰 Tech Stack

| Layer         | Tech                     |
| ------------- | ------------------------ |
| Frontend      | React, TailwindCSS       |
| API Gateway   | NGINX                    |
| Backend       | Express (Node.js), Flask |
| Database      | PostgreSQL               |
| Messaging     | Kafka                    |
| Storage       | AWS S3 or MinIO          |
| Auth          | JWT, Redis (optional)    |
| Orchestration | Docker, Kubernetes (K8s) |
| Monitoring    | Prometheus, Grafana      |

---

## 📁 Project Structure

```
threadly/
├── docker-compose.yml
├── .env.example
├── api-gateway/
├── frontend/               # React App
├── infra/                  # Kubernetes manifests, scripts
├── monitoring/             # Prometheus, Grafana config
├── services/
│   ├── auth/               # Express
│   ├── user-team/          # Express
│   ├── messaging/          # Flask + WebSocket
│   ├── file-upload/        # Flask
│   ├── notification/       # Express
│   ├── search/             # Flask + ElasticSearch
│   └── audit-logging/      # Flask
├── shared/
└── tests/
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/threadly.git
cd threadly
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Fill in the necessary variables
```

### 3. Start Services with Docker Compose

```bash
docker-compose up --build
```

> For individual service development, navigate to the specific service folder and run it manually.

---

## 🔄 Kafka Events Example

```json
{
  "event": "THREAD_MESSAGE_CREATED",
  "data": {
    "messageId": "msg_001",
    "channelId": "ch_101",
    "parentMessageId": "msg_045",
    "userId": "user_007",
    "text": "Great idea! Let's do it."
  }
}
```

---

## 🌐 Deployment

* Docker Compose for local setup
* Kubernetes manifests for production (infra/k8s)
* CI/CD via GitHub Actions (coming soon)

---

## 🧠 Contributors

* Nitin - Full Stack Developer (React + Flask)
* Yatin - Full Stack Developer (Express + Infra)

---

## 📄 License

MIT License

---

## 🙌 Acknowledgement

Threadly is an original project focused on learning and building scalable, distributed systems with real-time communication at its core.
