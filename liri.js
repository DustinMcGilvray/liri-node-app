require("dotenv").config();

var Spotify=require("node-spotify-api");

var keys=require("./keys.js");

var spotify = new Spotify(keys.spotify);

spotify.search({type: "track", query:"All the Small Things", limit:3}, function(err, data){
  console.log(JSON.stringify(data.item.name));
  });


// var moment = require('moment');
// moment().format();

// var request = require("request");

// var queryOMDB = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=ba07df28";

// var queryBands = "https://rest.bandsintown.com/artists/" + artist + "?app_id=4c2a161e046b3f11093fc1a6b94f97a3";

// //=================OMDB & BANDS-IN-TOWN REQUEST=================================
// request(queryOMDB, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     console.log(body);
//   }
// });

// request(queryBands, function(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     console.log(body);
//   }
// });