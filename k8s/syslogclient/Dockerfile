FROM ubuntu:20.04

# Avoid prompts from apt-get
ARG DEBIAN_FRONTEND=noninteractive

# Install rsyslog
RUN apt-get update && apt-get install -y rsyslog python3 python3-pip

# Install Flask
RUN pip3 install Flask

# Create a directory backend app
WORKDIR /app

# Replace the default rsyslog configuration
COPY rsyslog.conf /etc/rsyslog.conf

# Copy Flask app into the image
COPY ./app /app

# Install Python dependencies
RUN pip3 install -r requirements.txt
RUN pip install flask-cors

# Expose the port Flask is accessible on
EXPOSE 5000

# Start rsyslog and Flask app
CMD service rsyslog start && python3 /app/app.py
