#!/bin/bash

cd client

docker build -t hackathon .
docker run -p 3000:3000 hackathon