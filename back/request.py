import requests

response = requests.get("http://127.0.0.1:8000/open_now")
print(response.json())
