#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

apt update && apt install -y glib2.0-dev libvips-dev
chmod 777 /root # it's strange rule, try delete after node 16

cd './Clients/SampleSolution.Web'
npm install
chmod -R 777 ./node_modules/*
npm run build
cd -
