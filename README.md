docker run --rm -it --env-file ./env.list aracred:0.1.2  

## Usage
- create `./config` folder localy
- add `addressbook.json`
- run `docker run --rm -it -v ~/config:/home/root/.aragon/config --env-file ./env.list aracred:0.1.5

