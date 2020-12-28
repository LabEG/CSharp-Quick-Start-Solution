#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

apt update && apt install -y glib2.0-dev libvips-dev

cd './Clients/SampleSolution.Web'
sudo npm install --unsafe-perm
chmod -R 777 ./node_modules/*
npm run build
cd -
