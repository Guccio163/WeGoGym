from fastapi import FastAPI
import json
import datetime

from user_ratings import RatingSystem, Rating, RatingData

app = FastAPI()


def read_all_data():
    with open("data.json", "r") as file:
        data = json.load(file)
    return data


@app.get("/all_data")
async def read_root():
    data = read_all_data()
    return data


@app.get("/gyms/{place_id}/rating")
async def get_place_rating(place_id: str):
    return read_ratings().get_aggregate_rating(place_id)


@app.get("/gyms/{place_id}/rating/{user_id}")
async def get_place_rating_by_user(place_id: str, user_id: str):
    return read_ratings().get_rating(place_id, user_id)


@app.put("/gyms/{place_id}/rating/{user_id}")
async def put_rating(place_id: str, user_id: str, rating: RatingData):
    ratings = read_ratings()
    rating = Rating(user_id=user_id, personnel=rating.personnel.value, cleanliness=rating.cleanliness.value,
                    equipment=rating.equipment.value)
    ratings.add_rating(place_id, rating)
    ratings.to_json()
    return await get_place_rating_by_user(place_id, user_id)


@app.delete("/gyms/{place_id}/rating/{user_id}")
async def delete_rating(place_id: str, user_id: str):
    ratings = read_ratings()
    ratings.delete_rating(place_id, user_id)
    ratings.to_json()
    return


def read_ratings():
    return RatingSystem().from_json()


def is_time_between(time_str, start_time_str, end_time_str):
    time = datetime.datetime.strptime(time_str, '%H:%M').time()
    start_time = datetime.datetime.strptime(start_time_str, '%H:%M').time()
    end_time = datetime.datetime.strptime(end_time_str, '%H:%M').time()

    # Check if the given time is between start and end times
    if start_time <= time <= end_time:
        return True
    else:
        return False


@app.get("/gyms")
async def read_gyms(multisport: bool, medicover: bool, services: str, sort_by_price_ascending: bool,
                    sort_by_duration: str, sort_by_opinion: bool, open_now: bool):
    gyms = read_all_data()
    if multisport and medicover:
        gyms = await get_multisport_medicover(gyms)
    elif multisport:
        gyms = await get_multisport(gyms)
    else:
        gyms = await get_medicover(gyms)
    gyms = await get_services(gyms, services)
    gyms = await by_prices(gyms, sort_by_price_ascending, sort_by_duration)
    if sort_by_opinion:
        gyms = await by_opinion(gyms)
    if open_now:
        gyms = await by_open_now(gyms)
    return gyms


async def by_open_now(data):
    response = []
    for d in data:
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
            response.append(d)
    return response

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


async def opinion():
    data = read_all_data()
    for gym in data['gyms']:
        gym['combined_score'] = gym['opinion'] * 0.7 + gym['opinions_number'] * 0.3

    return sorted(data['gyms'], key=lambda x: x['combined_score'], reverse=True)


async def get_medicover(data):
    honors = []
    for gym in data["gyms"]:
        if "medicover" in gym["honored"]:
            honors.append(gym)
    return honors


async def get_multisport(data):
    honors = []
    for gym in data["gyms"]:
        if "multisport" in gym["honored"]:
            honors.append(gym)
    return honors


async def get_multisport_medicover(data):
    honors = []
    for gym in data["gyms"]:
        honors.append(gym)
    return honors


async def get_services(data, service: str = ''):
    with_service = []
    for gym in data:
        if service in gym["services"]:
            with_service.append(gym)
    return with_service


async def by_prices(data, ascending: bool = True, duration: str = '1'):
    gyms = data
    if ascending:
        if duration == "day":
            results = list(sorted(gyms, key=lambda item: get_price_key(item, duration)))
        elif duration == "year":
            results = list(sorted(gyms, key=lambda item: get_price_key(item, '12')))
        else:
            results = list(sorted(gyms, key=lambda item: get_price_key(item, '1')))
    else:
        if duration == "day":
            results = list(sorted(gyms, key=lambda item: get_price_key(item, duration), reverse=True))
        elif duration == "year":
            results = list(sorted(gyms, key=lambda item: get_price_key(item, '12'), reverse=True))
        else:
            results = list(sorted(gyms, key=lambda item: get_price_key(item, '1'), reverse=True))
    return results


async def by_opinion(data):
    return sorted(data, key=lambda x: x['opinion'], reverse=True)
