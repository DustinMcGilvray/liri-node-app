# LIRI Node App
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

## How to Use
First, Open GitBash/Command Line. Then you will need to load the required npm's. This can be accomplised by simply using the command <npm install> from the command line. Once the npm's are installed you can run the app from the command line. To run a search from one of the three API's (OMDB, Bands-In-Town, or Spotify) or read from the random.txt file, you will first need to navigate to the root folder of the app. Then to envoke <node> in the command line followed by the file name <liri.js>. Next, choose one of the desired commands:
 
 - Bands-in-Town: concert-this <artist/band name here>
  ![screenshot](screenShot_concert_this_command.jpg)
  
  - OMDB: movie-this <movie name here> 
  ![screenshot](screenShot_movie_this_command.jpg)
  
  - Spotify: spotify-this-song <song name here>
  ![screenshot](screenShot_spotify_this_command.jpg)
  
  - Read from the random.txt file: do-what-it-says 
  ![screenshot](screenShot_do_what_command.jpg)

Finally, press the Enter key. The results will appear in the command line as well as populate in the log.txt file. 
  
  
## Built With
* Node.js
* JavaScript
* Spotify API
* Bands in Town API
* OMDB API

## Author
* Dustin McGilvray
