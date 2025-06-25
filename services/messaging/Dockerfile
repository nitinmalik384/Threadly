FROM python:3.10-alpine

# Set working directory
WORKDIR /app

# Install system dependencies needed for psycopg2 and others
RUN apk add --no-cache \
    build-base \
    libffi-dev \
    openssl-dev \
    python3-dev \
    musl-dev \
    cargo

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose Flask port
EXPOSE 5002

# Run the Flask app
CMD ["python", "app.py"]
