#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

apt update && apt install -y glib2.0-dev libvips-dev

cd './Clients/SampleSolution.Web'
npm install --unsafe-perm=true --allow-root
chmod -R 777 ./node_modules/*
npm run build
cd -
