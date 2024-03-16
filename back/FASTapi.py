from fastapi import FastAPI
import json
import datetime
from typing import List

app = FastAPI()

def read_all_data():
    with open("data.json", "r") as file:
        data = json.load(file)
    return data


@app.get("/all_data")
async def read_root():
    data = read_all_data()
    return data


@app.get("/gyms")
async def read_gyms(multisport: bool, medicover: bool, services: str, sort_by_price: dict):
    gyms = read_all_data()["gyms"]
    return gyms



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


async def get_medicover():
    data = read_gyms()
    honors = {}
    for gym in data:
        print(gym)
        if "medicover" in gym["honored"]:
            honors.update(gym)
    return honors


async def get_multisport():
    data = read_gyms()
    honors = {}
    for gym in data:
        if "multisport" in gym["honored"]:
            honors.update(gym)
    return honors


async def get_services(service: str = ''):
    data = read_gyms()
    with_service = {}
    for gym in data:
        if service in gym["services"]:
            with_service.update(gym)
    return with_service


# if the duration is a number it searches for a card with such a duration,
# or the cheapest multiple of 1 if there is no such length
# if the duration is day it searches for the lowest price for one day,
# or if no one-time entry exists, the next cheapest one
def get_price_key(gym, duration: str):
    starting_price = 999999
    lowest_price = starting_price
    if duration == 'day':
        for entry in gym["pricing"]["singles"]:
            if int(entry["price"]) < lowest_price and entry["duration"] == '1':
                lowest_price = int(entry["price"])
        if lowest_price == starting_price:
            for entry in gym["pricing"]["singles"]:
                if int(entry["price"]) < lowest_price:
                    lowest_price = int(entry["price"])
    else:
        for entry in gym["pricing"]["cards"]:
            if entry["duration"] == duration and int(entry["price"]) < lowest_price:
                lowest_price = int(entry["price"])
        if lowest_price == starting_price:
            for entry in gym["pricing"]["cards"]:
                if int(entry["price"]) < lowest_price:
                    lowest_price = int(entry["price"])
            if int(duration) > 1:
                lowest_price *= int(duration)
    return lowest_price


async def by_prices(ascending: bool = True, duration: str = '1'):
    gyms = read_gyms()
    if ascending:
        if duration == "day":
            results = dict(sorted(gyms.items(), key=lambda item: get_price_key(item, duration)))
        elif duration == "year":
            results = dict(sorted(gyms.items(), key=lambda item: get_price_key(item, '12')))
        else:
            results = dict(sorted(gyms.items(), key=lambda item: get_price_key(item, '1')))
    else:
        if duration == "day":
            results = dict(sorted(gyms.items(), key=lambda item: get_price_key(item, duration), reverse=True))
        elif duration == "year":
            results = dict(sorted(gyms.items(), key=lambda item: get_price_key(item, '12'), reverse=True))
        else:
            results = dict(sorted(gyms.items(), key=lambda item: get_price_key(item, '1'), reverse=True))
    return results


async def opinion():
    data = read_all_data()
    for gym in data['gyms']:
        gym['combined_score'] = gym['opinion'] * 0.7 + gym['opinions_number'] * 0.3

    return sorted(data['gyms'], key=lambda x: x['combined_score'], reverse=True)