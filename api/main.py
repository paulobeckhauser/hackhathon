import json
from typing import Union

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db_api import *

# from fastapi.encoders import jsonable_encoder
# from fastapi.responses import JSONResponse

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
    return share_con(**s.dict())

class ConnectionSearch(BaseModel):
    frm: str
    to: str
    datetime: str
    prompt: str

@app.post("/connectionSearch/")
def connectionSearch(s: ConnectionSearch):
    conns = []
    pref = None
    while len(conns) < 10:
        con = get_conn(**s.dict(), pagingRef=pref)
        j = json.loads(con)
        conns.extend(j['verbindungen'])
        pref = j['verbindungReference']['later']
    if s.prompt:
        pass
    result = dict()
    result['verbindungen'] = conns
    result['recommended'] = 42
    return json.dumps(result)

@app.get("/citySearch/{name}")
def citySearch(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
