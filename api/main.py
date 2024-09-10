from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

from db_api import *
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

class ShareCon(BaseModel):
    frm: str
    to: str
    datetime: str
    tfID: str

@app.post("/shareCon/")
def shareCon(s: ShareCon):
    return share_con(**s.dict())

class ConnectionSearch(BaseModel):
    frm: str
    to: str
    datetime: str

@app.post("/connectionSearch/")
def connectionSearch(s: ConnectionSearch):
    pref = None
    responses = []
    while len(responses) < 3:
        con = get_conn(**s.dict(), pagingRef=pref)
        # j = prepare_llm_json(con)
        # print(j)
        pref = json.loads(con)['verbindungReference']['later']
        responses.append(json.loads(con))

    return json.dumps(responses)

@app.get("/citySearch/{name}")
def citySearch(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
