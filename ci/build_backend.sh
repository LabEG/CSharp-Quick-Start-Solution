#!/bin/bash
set -ex # e - exit on error, x - print command before execution

umask 000

cd './Backends/SampleSolution.Backend'
dotnet publish --configuration Release
cd -
