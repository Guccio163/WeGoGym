import requests

params = {
    "multisport": True,
    "medicover": True,
    "services": "sauna",
    "sort_by_price_ascending": True,
    "sort_by_duration": "month",
    "sort_by_opinion": True,
    "open_now": True
}

response = requests.get("http://127.0.0.1:8000/gyms", params=params)
print(response.json())
