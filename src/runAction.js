const execa = require("execa");

const { mode } = process.env

async function main () {
    let output
    mode === 'transfer' 
    ? output = await execa.command("node ./src/transfer",{ shell: true})
    : output = await execa.command("node ./src/mint",{ shell: true})

    console.log(output.stdout)
}

main()