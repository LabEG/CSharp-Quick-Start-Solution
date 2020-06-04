#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

cd './Backend/SampleSolution.Backend'
dotnet publish --configuration Release
cd -
