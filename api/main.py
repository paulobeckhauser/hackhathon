from typing import Union

from fastapi import FastAPI

from db_api import get_id
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/connectionSearch/")
def connectionSearch(station_from, station_to, datetime):
    return get_conn(station_from, station_to, datetime)

@app.get("/citySearch/{name}")
def citySearch(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
