FROM python:3.9-slim
WORKDIR /app
RUN pip install django celery redis
COPY . .
EXPOSE 8000
