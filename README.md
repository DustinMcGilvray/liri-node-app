# LIRI Node App
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## How to Use
To use the app you will need to load the required npm's. This can be accomplised by simply using the command <npm install> from the command line. Once the npm's are installed you can run the app from the command line. To run a search from one of the three API's (OMDB, Bands-In-Town, or Spotify) or read fron the random.txt file, first choose one of the desired commands:
  - <concert-this> for Bands-in-Town
  ![screenshot]("liri-node-app/screenShot_concert_this_command.jpg")
  - <movie-this> for OMDB
  ![screenshot]("screenShot_movie_this_command.jpg")
  - <spotify-this-song> for Spotify
  ![screenshot]("screenShot_spotify_this_command.jpg")
  - <do-what-it-says> to read from the random.txt file.
  ![screenshot]("screenShot_do_what_command.jpg")
Next, enter node liri.js <desired command> <desired artist/band, movie title, or song title> then press the enter key.

  
  
## Built With
* Node.js
* JavaScript
* Spotify API
* Bands in Town API
* OMDB API

## Author
* Dustin McGilvray
