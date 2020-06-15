#!/bin/sh

CONTAINER=`docker ps|grep araInstance|awk '{print $1}'`

docker exec -it araInstance /home/root/.aragon/runSourcecred.sh
docker exec -it araInstance /home/root/.aragon/runAracred.sh