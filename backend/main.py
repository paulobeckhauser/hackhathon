from typing import Union

from fastapi import FastAPI

from db_api import get_id

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/citySearch/{name}")
def read_item(name: str):
    return get_id(name)
    # return {"item_id": item_id, "q": q}
