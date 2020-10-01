require("dotenv/config");
// For interacting with Sport Radar API
//-------------------------------------------------
//

//const url_path = 'nfl/official/trial/v5/en/seasons/2019/standings.json' //for standings

async function nfl_teamprofile(team_id) {
  const fetch = require("node-fetch");
  const key = process.env.API_KEY;
  const url_path = `nfl/official/trial/v5/en/teams/${team_id}/profile.json`;
  const api_url = `https://api.sportradar.us/${url_path}?api_key=${key}`;
  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error("network response no good");
    }
    const myJSON = await response.json();

    return myJSON;
  } catch (error) {
    console.log("try failed", error.message);
  }
}
