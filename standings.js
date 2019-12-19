//read JSON from file---------------------------------------------------

function readJSON(file) {
    
    const fs = require('fs')

    const read = fs.readFileSync(file, 'utf-8')

    const clean = read.replace(/[\u0000-\u0019]+/g,"")

    const myJSON = JSON.parse(clean)

    return myJSON

} 

//-------------------------------------------------------------------------

let standings = readJSON('temp.json.nfl')

console.log(standings.conferences[1].divisions[0].teams[3].records)






