# Aracred

## Usage

### setup
- create `./config` folder in your working directory and add `addressbook.json`
- edit the sample env.list and save as `env.list` to the root of your current working directory

### start image 
- run `docker run -name=araInstance --rm -it -v ~/config:/home/root/.aragon/config --env-file ./env.list aracred:0.1.5`

### run Aracred
run Aracred using the following commands from your local machine
`docker exec -it araInstance /home/root/.aragon/runSourcecred.sh`
`docker exec -it araInstance /home/root/.aragon/runAracred.sh`

### automate Aracred


