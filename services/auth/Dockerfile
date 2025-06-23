FROM python:3.10-alpine

WORKDIR /app

COPY . .
# Install required system packages to build bcrypt
RUN apk add --no-cache \
    build-base \
    libffi-dev \
    openssl-dev \
    python3-dev \
    musl-dev \
    cargo


RUN pip install --no-cache-dir -r requirements.txt


CMD ["python", "app.py"]
