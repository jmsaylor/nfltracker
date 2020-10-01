//read JSON from file---------------------------------------------------

function readJSON(file) {
    
    const fs = require('fs')

    const read = fs.readFileSync(file, 'utf-8')

    const clean = read.replace(/[\u0000-\u0019]+/g,"")

    const myJSON = JSON.parse(clean)

    return myJSON

} 

//-------------------------------------------------------------------------

let profile = readJSON('teamprofile.json')

const top_keys = Object.keys(profile) // nice little tool for seeing top level view of how JSON data is structured 

console.log(top_keys)

console.log('-----------------------------------')

//console.log(profile.players[0]);

const top_player_keys = Object.keys(profile.players[0])


