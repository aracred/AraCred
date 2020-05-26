const execa = require("execa");

const { mode } = require('../config/config.json')

async function main () {
    let output
    mode === 'transfer' 
    ? output = await execa.command("node ./src/transfer",{ shell: true})
    : output = await execa.command("node ./src/mint",{ shell: true})

    console.log(output.stdout)
}

main()