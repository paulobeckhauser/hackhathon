from typing import Union

from fastapi import FastAPI, Response
from pydantic import BaseModel

from db_api import *
from fastapi.middleware.cors import CORSMiddleware

from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

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

class ShareCon(BaseModel):
    frm: str
    to: str
    datetime: str
    tfID: str

@app.post("/shareCon/")
def shareCon(s: ShareCon):
    return JSONResponse(content=share_con(**s.dict()))

class ConnectionSearch(BaseModel):
    frm: str
    to: str
    datetime: str

@app.post("/connectionSearch/")
def connectionSearch(s: ConnectionSearch):
    responses = []
    pref = None
    while len(responses) < 3:
        con = get_conn(**s.dict(), pagingRef=pref)
        pref = json.loads(con)['verbindungReference']['later']
        responses.append(con)
    return JSONResponse(content=responses)

@app.get("/citySearch/{name}")
def citySearch(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
