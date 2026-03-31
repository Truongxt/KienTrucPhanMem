import os

app_env = os.getenv('APP_ENV', 'unknown')
app_name = os.getenv('APP_NAME', 'Docker App')

print(f"Application: {app_name}")
print(f"Environment: {app_env}")
print("Application started successfully!")
