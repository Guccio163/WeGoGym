from enum import Enum
import json
from pydantic import BaseModel

"""
Ratings are kept in RatingSystem object that contains a dict with objects.
Each object has a list of Ratings. Ratings contain user_id and attributes corresponding to RatingCategory.
Each attribute can be a RatingValue (or str for "written" attribute)

RatingSystem methods:
- add_object(self, object_id)
- delete_object(self, object_id)
- add_rating(self, object_id, rating: Rating)
- delete_rating(self, object_id, user_id)
- def get_aggregate_rating(self, object_id) - returns dict with averaged grades
- get_written_rating(self, object_id) - returns list with written responses
"""

RatingValue = Enum('RatingValue',
                   {'ONE': '1', 'TWO': '2', 'THREE': '3', 'FOUR': '4', 'FIVE': '5', 'IRRELEVANT': 'irrelevant'})
RatingCategory = Enum('RatingCategory', ['personnel', 'cleanliness', 'equipment', 'written'])


class RatingData(BaseModel):
    personnel: RatingValue
    equipment: RatingValue
    cleanliness: RatingValue


class Rating:
    def __init__(self, user_id, **kwargs):
        self.user_id = user_id
        self.personnel = None
        self.cleanliness = None
        self.equipment = None
        self.written = None
        for key, value in kwargs.items():
            if key in RatingCategory.__members__:
                if key != "written" and not any(value == item.value for item in RatingValue):
                    raise ValueError(
                        f"Invalid value '{value}'. Must be one of {', '.join(str(item.value) for item in RatingValue)}")
                setattr(self, key, value)
            else:
                raise ValueError(f"Invalid rating category: {key}")

    def from_json(self, json_data):
        self.user_id = json_data['user_id']
        self.personnel = json_data['personnel']
        self.cleanliness = json_data['cleanliness']
        self.equipment = json_data['equipment']
        self.written = json_data['written']
        return self

    def __str__(self):
        return json.dumps(self, default=lambda o: o.__dict__)


# dict z obiektami po obiekt_id
class RatingSystem:
    def __init__(self):
        self.ratings = {}

    def from_json(self):
        with open('ratings.json', 'r') as openfile:
            json_object = json.load(openfile)
            self.ratings = json_object['ratings']
            for object_id, ratings_list in self.ratings.items():
                new_list = [Rating(None).from_json(json_rating) for json_rating in ratings_list]
                self.ratings[object_id] = new_list
        return self

    def to_json(self):
        json_data = json.dumps(self, default=lambda o: o.__dict__)
        with open('ratings.json', 'w') as file:
            file.write(json_data)

    def get_object(self, object_id: str):
        if object_id in self.ratings:
            return json.dumps(self.ratings[object_id], default=lambda o: o.__dict__)
        else:
            print("Object not found")
            return None

    def add_object(self, object_id: str):
        if object_id not in self.ratings:
            self.ratings[object_id] = []

    def delete_object(self, object_id: str):
        if object_id in self.ratings:
            self.ratings.pop(object_id)
        else:
            print("Object not found")

    def get_rating(self, object_id: str, user_id: str):
        if object_id in self.ratings:
            for rating in self.ratings[object_id]:
                if str(rating.user_id) == str(user_id):
                    return rating
        else:
            print("Object not found")

    def add_rating(self, object_id: str, rating: Rating):
        if object_id in self.ratings:
            self.ratings[object_id].append(rating)
        else:
            print("Object not found")

    def delete_rating(self, object_id: str, user_id: str):
        if object_id in self.ratings:
            if user_id in self.ratings[object_id]:
                self.ratings[object_id].remove(user_id)
        else:
            print("Object not found")

    def get_aggregate_rating(self, object_id: str):
        if object_id in self.ratings:
            ratings_sum = {x: [] for x in RatingCategory.__members__}
            for rating in self.ratings[object_id]:
                for attr, value in vars(rating).items():
                    if attr in ratings_sum and isinstance(value, int):
                        ratings_sum[attr].append(value)
            ratings_sum = {x: sum(ratings_sum[x]) / len(ratings_sum[x]) if ratings_sum[x] else None for x in
                           ratings_sum.keys()}
            ratings_sum.pop("written")
            return ratings_sum
        else:
            print("Object not found")
            return dict()

    def get_written_rating(self, object_id: str):
        if object_id in self.ratings:
            all_ratings = []
            for rating in self.ratings[object_id]:
                if rating.written:
                    all_ratings.append(rating.written)
            return all_ratings
        else:
            print("Object not found")
            return dict()

# example code
# object1 = 1
# object2 = 2
# object3 = 3
# object4 = 4
# user1 = 101
# user2 = 102
# rating1 = Rating(user1, personnel=5, cleanliness=5, written="good")
# rating2 = Rating(user1, personnel=3, equipment=3, cleanliness="irrelevant", written="ok")
# rating3 = Rating(user1, personnel="irrelevant", equipment=3, cleanliness=4, written="alright")
# rating4 = Rating(user1, personnel=3, equipment=5, cleanliness=5, written="git")
# rating5 = Rating(user2, personnel=4, equipment=3, cleanliness="irrelevant", written="fine")
# rating6 = Rating(user2, personnel=4, equipment="irrelevant", cleanliness=5, written="works")
# rating7 = Rating(user2, personnel=2, equipment=5, cleanliness=3, written="not bad")
#
# rating_system = RatingSystem()
# rating_system.add_object(object1)
# rating_system.add_object(object2)
# rating_system.add_object(object3)
# rating_system.add_object(object4)
# rating_system.add_rating(object1, rating1)
# rating_system.add_rating(object2, rating2)
# rating_system.add_rating(object3, rating3)
# rating_system.add_rating(object4, rating4)
# rating_system.add_rating(object1, rating5)
# rating_system.add_rating(object3, rating6)
# rating_system.add_rating(object4, rating7)
# print(rating_system.get_aggregate_rating(object1))
# print(rating_system.get_written_rating(object1))
# print(rating_system.get_aggregate_rating(object2))
# print(rating_system.get_written_rating(object2))
# rating_system.to_json()
# # rating_system.delete_rating(object, rating1)
# # rating_system.delete_object(object)
#

# x = RatingSystem().from_json()
# print(x.get_rating("1", "101"))
# print(x.get_object("1"))
