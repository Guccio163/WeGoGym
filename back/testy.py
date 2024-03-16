import json
import datetime


def is_time_between(time_str, start_time_str, end_time_str):
    time = datetime.datetime.strptime(time_str, '%H:%M').time()
    start_time = datetime.datetime.strptime(start_time_str, '%H:%M').time()
    end_time = datetime.datetime.strptime(end_time_str, '%H:%M').time()

    # Check if the given time is between start and end times
    if start_time <= time <= end_time:
        return True
    else:
        return False



def read_all_data():
    with open("data.json", "r") as file:
        d = json.load(file)
    return d


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

print(response)

