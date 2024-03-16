from fastapi import FastAPI
import json

app = FastAPI()


def read_all_data():
    with open("data.json", "r") as file:
        data = json.load(file)
    return data


def read_gyms():
    with open("data.json", "r") as file:
        data = json.load(file)
        gyms = data["gyms"]
    return gyms


@app.get("/all_data")
async def read_root():
    data = read_all_data()
    return data


@app.get("/by_price")
async def read_by_price():
    data = read_all_data()
    return data

@app.get("/medicover")
async def get_medicover():
    data = read_gyms()
    honors = {}
    for gym in data:
        print(gym)
        if "medicover" in gym["honored"]:
            honors.update(gym)
    return honors

@app.get("/multisport")
async def get_multisport():
    data = read_gyms()
    honors = {}
    for gym in data:
        if "multisport" in gym["honored"]:
            honors.update(gym)
    return honors

