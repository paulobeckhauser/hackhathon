import json
from typing import Union

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from db_api import *
from lang import prompt_llm

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
        con = get_conn(s.frm, s.to, s.datetime, pagingRef=pref)
        j = json.loads(con)
        conns.extend(j['verbindungen'])
        pref = j['verbindungReference']['later']
    result = dict()
    if s.prompt:
        j = prepare_llm_json(conns)
        result['recommended'] = prompt_llm(j, s.prompt)
    result['verbindungen'] = conns
    # temporary demo info
    if 'Düsseldorf Hbf' in s.frm and 'Frankfurt(Main)Hbf' in s.to:
        result['reliability'] = '77% zuverlässig, 7.5% Zugausfall'
    print(json.dumps(result))
    return json.dumps(result)

@app.get("/citySearch/{name}")
def citySearch(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
