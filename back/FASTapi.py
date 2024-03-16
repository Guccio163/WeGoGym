from fastapi import FastAPI
import pandas as pd

app = FastAPI()


@app.get("/data/gyms")
async def get_data():
    # Read data from JSON file
    with open("data.json", "r") as file:
        data = json.load(file)

    # Extract gyms field
    gyms_data = data.get("gyms")

    return gyms_data


