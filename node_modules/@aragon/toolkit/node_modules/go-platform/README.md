# node-go-platform

Figures out the host machine's platform for Go purposes.

```
npm install go-platform
```

## cli

It includes a cli tool that prints out `$GOOS-$GOARCH`:

```sh
> npm install go-platform
> node_modules/.bin/go-platform
darwin-amd64

> node_modules/.bin/go-platform --env
GOOS=darwin
GOARCH=amd64

> node_modules/.bin/go-platform --obj
{"GOOS": "darwin", "GOARCH": "amd64"}

> node_modules/.bin/go-platform --obj --pretty
{
  "GOOS": "darwin",
  "GOARCH": "amd64"
}
```

## lib

```node
> var goplatform = require('go-platform')
> console.log(goplatform)
{ GOOS: 'darwin', GOARCH: 'amd64'}
```
