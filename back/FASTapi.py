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


async def by_prices(lowest: bool = True, duration: str = '1'):
    gyms = read_gyms()
    if lowest:
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
