#!/bin/bash
set -ex # e - exit on error, x - print command before execution

echo ""
echo ""
echo " ====== Build project: SampleSolution.Backend ====== "
echo ""

docker run -t \
           -w /app \
           --network=host \
           --rm \
           -v ${PWD}:/app \
           mcr.microsoft.com/dotnet/sdk:5.0-alpine \
           sh ./ci/build_backend.sh

echo ""
echo ""
echo " ====== Build project: SampleSolution.Web ====== "
echo ""

docker run -t \
           -w /app \
           --network=host \
           --rm \
           -v ${PWD}:/app \
           node:latest \
           sh ./ci/build_web.sh

echo ""
echo ""
echo " ====== Make docker: SampleSolution Dockers ====== "
echo ""

docker run -t \
           -w /app \
           --network=host \
           --rm \
           -v ${PWD}:/app \
           -v /var/run/docker.sock:/var/run/docker.sock \
           -e DOCKER_USERNAME=$DOCKER_USERNAME \
           -e DOCKER_PASSWORD=$DOCKER_PASSWORD \
           docker:latest \
           sh ./ci/build_docker.sh

echo ""
echo ""
echo " ====== Clean build agent ====== "
echo ""

docker system prune -f || true
