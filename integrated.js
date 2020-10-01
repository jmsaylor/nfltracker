//read JSON from file----------------eventually switch it out with node-fetch or other http tool for actual api calls

function readJSON(file) {
    
    const fs = require('fs')

    const read = fs.readFileSync(file, 'utf-8')

    const clean = read.replace(/[\u0000-\u0019]+/g,"") //

    const myJSON = JSON.parse(clean)

    return myJSON

} 

//-------------------------------------------------------------------------

let profile = readJSON('teamprofile.json')

let standings = readJSON('temp.json.nfl') // ex. standings.conferences[1].divisions[0].teams[3])

let top_keys_profile = Object.keys(profile) // mainly in profile.players[x]
let top_keys_standings = Object.keys(standings) //[ 'season', 'week', 'conferences', '_comment' ] *standings insides conferences 
                                                // i.e. - standings.conferences[1].division[3]

// console.log(top_keys_profile) 
// console.log('-----------------------------------')
// console.log(standings.season)

const team_ids = () => {
    //gets team ids from standings.json, necessary for team profile lookups

    const team_ids = []
    count = 0

    for (let x = 0; x < standings.conferences.length; x++) {
        for (let y = 0; y < standings.conferences[x].divisions.length; y++ ) {
            for (let z = 0; z < standings.conferences[x].divisions[y].teams.length; z++) {
                team_ids.push([standings.conferences[x].divisions[y].teams[z].id])    // should model what I'm collecting better
                team_ids[count].push(standings.conferences[x].divisions[y].teams[z].name) //2d array [[id, name],...]
                count += 1
            }
        }
    }

    return team_ids

} 

const td_diffs = () => {
    // gets touchdown differentials from standings.json

    let td_diffs = []
    let count = 0

    for (let x = 0; x < standings.conferences.length; x++) {
        for (let y = 0; y < standings.conferences[x].divisions.length; y++ ) {
            for (let z = 0; z < standings.conferences[x].divisions[y].teams.length; z++) {
                td_diffs.push([standings.conferences[x].divisions[y].teams[z].touchdown_diff])    // should model what I'm collecting better
                td_diffs[count].push(standings.conferences[x].divisions[y].teams[z].name) //2d array [[id, name],...]
                count += 1
            }
        }
    }

    return td_diffs
}

async function nfl_teamprofile(team_id) {
    // api call to sports radar for team profile
    const fetch = require('node-fetch')
    const key = 'wbd7wb63wk8n2zyexjzg37m7'
    const url_path = `nfl/official/trial/v5/en/teams/${team_id}/profile.json`
    const api_url = `https://api.sportradar.us/${url_path}?api_key=${key}`
    try {
        const response = await fetch(api_url)
        if (!response.ok) {
            throw new Error("network response no good")
        } 
        const myJSON = await response.text()

        return myJSON
    } catch (error) {
        console.log('try failed', error.message)
    }
}


console.log(td_diffs());

//console.log(Object.keys(standings.conferences[0].divisions[0].teams[0]))

