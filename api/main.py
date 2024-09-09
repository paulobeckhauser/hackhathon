from typing import Union

from fastapi import FastAPI

from db_api import get_id, get_conn

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/connectionSearch/{station_from}/{station_to}/{datetime}")
def connectionSearch(station_from, station_to, datetime):
    return get_conn(station_from, station_to, datetime)

@app.get("/citySearch/{name}")
def citySearch(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
