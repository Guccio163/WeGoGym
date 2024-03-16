from fastapi import FastAPI
import json
import datetime
from typing import List

app = FastAPI()


def read_all_data():
    with open("data.json", "r") as file:
        data = json.load(file)
    return data


def is_time_between(time_str, start_time_str, end_time_str):
    time = datetime.datetime.strptime(time_str, '%H:%M').time()
    start_time = datetime.datetime.strptime(start_time_str, '%H:%M').time()
    end_time = datetime.datetime.strptime(end_time_str, '%H:%M').time()

    # Check if the given time is between start and end times
    if start_time <= time <= end_time:
        return True
    else:
        return False

async def read_by_price():
    data = read_all_data()
    return data


async def open_now():
    data = read_all_data()
    response = {}
    for d in data["gyms"]:
        current_date = datetime.datetime.now()
        day_of_week = current_date.strftime("%A").lower()
        open_hour = d["opening hours"][day_of_week]
        start_time_str, end_time_str = open_hour.split(" - ")
        current_time = datetime.datetime.now().time()
        hour = current_time.hour
        minute = current_time.minute
        time_str = str(hour) + ":" + str(minute)
        print("!")
        if is_time_between(time_str, start_time_str, end_time_str):
            response.update(d)
    return response


async def opinion():
    data = read_all_data()
    for gym in data['gyms']:
        gym['combined_score'] = gym['opinion'] * 0.7 + gym['opinions_number'] * 0.3

    return sorted(data['gyms'], key=lambda x: x['combined_score'], reverse=True)


@app.get("/gyms")
async def read_root(multisport: bool, medicover: bool, services: str, sort_by_price: dict):
    gyms = read_all_data()["gyms"]




