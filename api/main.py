from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

from db_api import get_id, get_conn
from fastapi.middleware.cors import CORSMiddleware

import json

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


class ConnectionSearch(BaseModel):
    frm: str
    to: str
    datetime: str

@app.post("/connectionSearch/")
def connectionSearch(s: ConnectionSearch):
    return get_conn(**s.dict())

@app.get("/citySearch/{name}")
def citySearch(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
