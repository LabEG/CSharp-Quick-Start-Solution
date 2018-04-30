#!/bin/bash

nowTimeStamp="$(date +'%Y-%m-%d')_$(date +'%H.%M.%S')"

projects=()
projects+=('Backend')

for project in "${projects[@]}"
do

   projectlow=${project,,} # to low case

    echo ""
	echo ""
	echo " ====== Build project: $project ====== "
	echo ""

	cd SampleSolution.$project

    sed -i -e "s/{_date_}/$nowTimeStamp/g" Program.cs
    
    /opt/dotnet/dotnet restore
    /opt/dotnet/dotnet build --configuration Release
    /opt/dotnet/dotnet publish --configuration Release
    
    docker build -t samplesolution/$projectlow:dev_$nowTimeStamp .
    
    docker tag samplesolution/$projectlow:dev_$nowTimeStamp docker.dev.local:5000/samplesolution/$projectlow:dev_latest
    docker push docker.dev.local:5000/samplesolution/$projectlow:dev_latest
    docker image remove docker.dev.local:5000/samplesolution/$projectlow:dev_latest
    
    docker tag samplesolution/$projectlow:dev_$nowTimeStamp docker.dev.local:5000/samplesolution/$projectlow:dev_$nowTimeStamp
    docker push docker.dev.local:5000/samplesolution/$projectlow:dev_$nowTimeStamp
    docker image remove docker.dev.local:5000/samplesolution/$projectlow:dev_$nowTimeStamp
    
    docker image remove samplesolution/$projectlow:dev_$nowTimeStamp
    
    cd ..

done

    echo ""
	echo ""
	echo " ====== Clean docker repository ====== "
	echo ""

node -v
node ./SolutionItems/cleanRepo.js

    echo ""
	echo ""
