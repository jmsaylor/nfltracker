const fetch = require('node-fetch')

const fs = require('fs')

const key = 'wbd7wb63wk8n2zyexjzg37m7'

//--------------------------------------------------

//const url_path = 'nfl/official/trial/v5/en/seasons/2019/standings.json' //for standings

const team_ids = fs.readFileSync('team_ids.txt', 'utf-8')

//-------------------------------------------------

const team = 'e627eec7-bbae-4fa4-8e73-8e1d6bc5c060'

const url_path = `nfl/official/trial/v5/en/teams/${team}/profile.json`

const api_url = `https://api.sportradar.us/${url_path}?api_key=${key}`

//---------------------------------------------------

async function nfl(api_url) {
    try {
        const response = await fetch(api_url)
        if (!response.ok) {
            throw new Error("network response no good")
        } 
        const myJSON = await response.text()

        fs.writeFile()
    } catch (error) {
        console.log('try failed', error.message)
    } finally {
         //maybe put in some kind of tag
    }
}

console.log(team_ids);


