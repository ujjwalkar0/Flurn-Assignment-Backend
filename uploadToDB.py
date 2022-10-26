import pandas as pd
from pymongo import MongoClient

print("Reading csv...")
seat = pd.read_csv("Seats.csv")
seatPrice = pd.read_csv("SeatPricing.csv")
print("Done...")

print("Marging CSV...")
data = pd.merge(seat, seatPrice, on="seat_class", how="inner")
data["is_booked"] = [False]*data.shape[0]
data = data.drop(columns=["id_x", "id_y"]).to_dict(orient='records')
print("Done...")

print("Uploading to database...")

# mongo = MongoClient("mongodb://172.17.0.1:27017")
mongo = MongoClient("mongodb://mongo:27017")

mydb = mongo["flurn"]

mydb.seats.insert_many(data)
print("Done...")