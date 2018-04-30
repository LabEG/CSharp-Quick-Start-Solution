#!/bin/bash

echo "";
echo -n "Enter comment for commit > ";
read text;

# SampleSolution Project
cd ..\\;

echo " === Project === ";
echo "";
echo " --- add --- ";
git add -A;

echo "";
echo " --- commit --- ";
git commit -m "$text";

echo "";
echo " --- pull --- ";
git pull;

echo "";
echo " --- push --- ";
git push;

echo "";
echo " --- status --- ";
git status;

echo "";
echo  " --- Completed --- ";
read;