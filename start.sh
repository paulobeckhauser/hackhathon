#!/bin/bash

git pull
cd api
docker build -t api .
docker run -p8000:8000 api