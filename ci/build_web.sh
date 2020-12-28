#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

apt update && apt install -y glib2.0-dev libvips-dev
chmod 777 /root

cd './Clients/SampleSolution.Web'
npm install
chmod -R 777 ./node_modules/*
npm run build
cd -
