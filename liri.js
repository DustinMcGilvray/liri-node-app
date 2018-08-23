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

//=========DO WHAT IT SAYS VARIABLES =============//
var fs = require("fs");

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
function songSearch(userInput) {
spotify.search({type: "track", query:userInput}, function(err, data){
  if(err) {
    console.log('Error Occured: ' + err);
    return;
  }
  console.log("--------SPOTIFY START---------");
  console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
  console.log("Song Name: " + JSON.stringify(data.tracks.items[0].name));
  console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
  console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));
  console.log("--------SPOTIFY END---------");
  fs.appendFileSync("log.txt","==============SPOTIFY START==============");
  fs.appendFileSync("log.txt","\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
  fs.appendFileSync("log.txt", "\nSong Name: " + JSON.stringify(data.tracks.items[0].name));
  fs.appendFileSync("log.txt", "\nPreview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
  fs.appendFileSync("log.txt", "\nAlbum: " + JSON.stringify(data.tracks.items[0].album.name));
  fs.appendFileSync("log.txt","\n==============SPOTIFY END================\n");
  fs.appendFileSync("log.txt"," \n ");
  });
}
//===========SPOTIFY REQUEST END=====================================//

//=================OMDB REQUEST=================================//
function movieSearch(userInput) {
var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=ba07df28";
request(queryURL, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("--------OMDB START---------");
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country Produced: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("--------OMDB END---------");
    fs.appendFileSync("log.txt","==============OMDB START==============");
    fs.appendFileSync("log.txt","\nMovie Title: " + JSON.parse(body).Title);
    fs.appendFileSync("log.txt", "\nRelease Year: " + JSON.parse(body).Year);
    fs.appendFileSync("log.txt", "\nIMDB Rating: " + JSON.parse(body).imdbRating);
    fs.appendFileSync("log.txt", "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    fs.appendFileSync("log.txt", "\nCountry Produced: " + JSON.parse(body).Country);
    fs.appendFileSync("log.txt", "\nLanguage: " + JSON.parse(body).Language);
    fs.appendFileSync("log.txt", "\nPlot: " + JSON.parse(body).Plot);
    fs.appendFileSync("log.txt", "\nActors: " + JSON.parse(body).Actors);
    fs.appendFileSync("log.txt","\n==============OMDB END================\n");
    fs.appendFileSync("log.txt"," \n ");
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
      console.log("--------BANDS IN TOWN START---------");
      console.log("Venue: " + JSON.stringify(events[0].venue.place));
      console.log("Location: " + JSON.stringify(events[0].formatted_location));
      date = moment(events[0].datetime).format("MM/DD/YYYY");
      console.log("Date: " + date);
      console.log("--------BANDS IN TOWN END---------");
      fs.appendFileSync("log.txt","==============BANDS IN TOWN START==============");
      fs.appendFileSync("log.txt","\nVenue: " + JSON.stringify(events[0].venue.place));
      fs.appendFileSync("log.txt", "\nLocation: " + JSON.stringify(events[0].formatted_location));
      fs.appendFileSync("log.txt", "\nDate: " + JSON.stringify(date));
      fs.appendFileSync("log.txt","\n==============BANDS IN TOWN END================\n");
      fs.appendFileSync("log.txt"," \n ");
  });
}
//=================BANDS-IN-TOWN REQUEST END=================================//

//=================DO WHAT IS SAYS FUNCTION START=================================//
var doWhat = function(userInput) {
  fs.readFile("random.txt","utf8", function(error, data){
    if(error) {
      return console.log("You found an Error!");
    }
    else {
      var text = data.split(",");
    }
    songSearch(text[1]);
  });
}
//=================DO WHAT IS SAYS FUNCTION START=================================//

//=================SWITCH START====================================================//
switch (userChoice) {
  case "concert-this":
      bandSearch();
      break;
  case "spotify-this-song":
    if(userInput) {
      songSearch(userInput);
    }
    else {
      songSearch("Loser")
    }
      break;
  case "movie-this":
    if(userInput) {
      movieSearch(userInput);
    }
    else {
      movieSearch("Princess Bride");
      console.log("If you haven't watched 'Princess Bride,' then you should: https://www.imdb.com/title/tt0093779/");
      console.log("It's on Netflix!")
    }
      break;
  case "do-what-it-says":
    doWhat();
      break;
}
//=================SWITCH END====================================================//