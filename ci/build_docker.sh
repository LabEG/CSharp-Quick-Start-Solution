#!/bin/bash
set -ex # e - exit on error, x - print command before execution

# login
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

# release
tag="latest"

# build backend
cd './Backends/SampleSolution.Backend'
docker build --network=host -t labeg/csharp-qss-backend:$tag .
docker push labeg/csharp-qss-backend:$tag
cd -

# clean repository
docker rmi -f labeg/csharp-qss-backend:$tag

# build frontend
cd './Clients/SampleSolution.Web'
docker build --network=host -t labeg/csharp-qss-frontend:$tag .
docker push labeg/csharp-qss-frontend:$tag
cd -

# clean repository
docker rmi -f labeg/csharp-qss-frontend:$tag
