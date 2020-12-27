#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

apt-get update && apt-get install -y glib2.0-dev libvips-dev

cd './Clients/SampleSolution.Web'
ls -lah
ls -lah /root
ls -lah /root/.npm
chmod -R 777 /root/.npm
apt search glib
npm config set unsafe-perm true
npm install --unsafe-perm=true --allow-root
chmod -R 777 ./node_modules/*
npm run build
cd -
