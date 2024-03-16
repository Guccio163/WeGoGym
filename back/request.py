import requests

params = {
    "multisport": True,
    "medicover": True,
    "services": "sauna",
    "sort_by_price": {
        "ascending": True,
        "duration": "month"
    }

}

response = requests.get("http://127.0.0.1:8000/all_data", params={"multisport" : True})

print(response.json())
