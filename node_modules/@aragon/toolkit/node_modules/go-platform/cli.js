#!/usr/bin/env node

var platform = require('./index.js')
var argv = process.argv

var out = ""

// print out --env
if (contains(argv, "--env")) {
  for (var k in platform) {
    if (platform.hasOwnProperty(k)) {
      out += k + "=" + platform[k] + "\n"
    }
  }

// print out object
} else if (contains(argv, "--obj")) {

  // be pretty about it
  if (contains(argv, "--pretty")) {
    out = JSON.stringify(platform, 0, 4)
  } else {
    out = JSON.stringify(platform)
  }
  out += "\n"

// print out platform: $GOOS-$GOARCH
} else {
  out = platform.GOOS +"-"+ platform.GOARCH + "\n"
}

process.stdout.write(out)

function contains(a, obj) {
  var i = a.length
  while (i--) {
    if (a[i] === obj) {
      return true
    }
  }
  return false
}
