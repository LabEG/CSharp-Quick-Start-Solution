#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

apt-get update && apt-get install -y glib2.0-dev libvips-dev

cd './Clients/SampleSolution.Web'
apt search glib
mkdir /root/.npm
npm config set unsafe-perm true
npm install --unsafe-perm=true --allow-root
chmod -R 777 ./node_modules/*
npm run build
cd -
