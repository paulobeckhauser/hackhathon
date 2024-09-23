# Use an official Python image as a base
FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .
COPY .env .

# Expose the port
EXPOSE 8000

# Run the command to start the development server
#CMD ["fastapi", "run", "--host", "0.0.0.0", "--port", "8000", "main:app"]
CMD ["fastapi", "dev", "--host", "0.0.0.0", "main.py"]
