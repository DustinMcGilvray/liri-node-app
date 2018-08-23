require("dotenv").config();

//======SPOTIFY VARIABLES=========//
var Spotify=require("node-spotify-api");
var keys=require("./keys.js");
var spotify = new Spotify(keys.spotify);

//======OMDB VARIABLES===========//
var request = require("request");
var nodeArgs = process.argv;
var userInput = "";

//========BANDS IN TOWN VARIABLES=====//
var userChoice = process.argv[2];
var moment = require("moment");
var date;
var bandsintown = require('bandsintown')('4c2a161e046b3f11093fc1a6b94f97a3');

//========FOR LOOP FOR API CALLS=======//
for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    userInput = userInput + "+" + nodeArgs[i];
  }
  else {
    userInput += nodeArgs[i];
  }
}
//========FOR LOOP FOR API CALLS END=======//

//===========SPOTIFY REQUEST=====================================//
function songSearch() {
spotify.search({type: "track", query:userInput}, function(err, data){
  if(err) {
    console.log('Error Occured: ' + err);
    return;
  }
  console.log("--------START---------");
  console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
  console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));
  console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
  console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
  console.log("--------END---------");
  });
}
//===========SPOTIFY REQUEST END=====================================//

//=================OMDB REQUEST=================================//
function movieSearch() {
var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=ba07df28";
request(queryURL, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("--------START---------");
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("--------END---------");
  }
});
}
//=================OMDB REQUEST END=================================//

//=================BANDS-IN-TOWN REQUEST=================================//
function bandSearch() {
bandsintown
  .getArtistEventList(userInput)
  .then(function(events, err) {
    if(err) {
      console.log('Error occured: ' + err);
      return;}
      console.log("--------START---------");
      console.log(events[0].venue.place);
      console.log(events[0].formatted_location);
      date = moment(events[0].datetime).format("MM/DD/YYYY");
      console.log(date);
      console.log("--------END---------");
  });
}
//=================BANDS-IN-TOWN REQUEST END=================================//

//=================SWITCH START====================================================//
switch (userChoice) {
  case "concert-this":
      bandSearch();
      break;
  case "spotify-this-song":
      songSearch();
      break;
  case "movie-this":
    movieSearch();
      break;
}
//=================SWITCH END====================================================//