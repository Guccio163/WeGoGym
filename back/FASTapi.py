from fastapi import FastAPI
import json

app = FastAPI()


def read_all_data():
    with open("data.json", "r") as file:
        data = json.load(file)
    return data


@app.get("/all_data")
async def read_root():
    data = read_all_data()
    return data


@app.get("/by_price")
async def read_by_price():
    data = read_all_data()
    return data



