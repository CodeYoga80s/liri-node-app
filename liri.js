//using .env to hide keys
require("dotenv").config();

//project vars
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var movieName = "";
var liriReturn = process.argv[2];
var twitter = require('twitter');
var client = new twitter(keys.twitter);
var trackName = process.argv[3];
var nodeArgs = process.argv;
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) { 
        movieName = movieName + "+" + nodeArgs[i]; 
    }
    else {
        movieName += nodeArgs[i];
    }
  }


// Using the switch statement in place of if statements for the defined functions below.  This statement will execute the desired command by the users.
switch (liriReturn) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong(trackName);
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;


    default: console.log(
        "\n" 
        + "type one of the available commands after typing 'node liri.js': "
        + "\n"
        + "my-tweets"
        + "\n"
        + "spotify-this-song 'Search for any song title by typing it here' "
        + "\n"
        + "movie-this 'Search for any movie title by typing it here' "
        + "\n"
        + "do-what-it-says 'just do what it says' "
        + "\n"
        + "for titles with multiple words, use quotes"
        );
};

// Object constructor and function for my tweets.  Error handling is also functioned in.
function myTweets() {
    var params = { screen_name: 'CodeYoga80s' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {

                console.log(tweets[i].text);
            };
        } else {
            console.log("error: " + err);
            return;
        };
    });
};

// Object constructor and function for my tweets.  Error handling is also functioned in.
function spotifyThisSong(trackName) {
    if (!trackName) {
        trackName = "The Sign";
    };
    songRequest = trackName;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < 5; i++) {
                    if (trackInfo[i] != undefined) {
                        var spotifyResults =
                            "Artist: " + trackInfo[i].artists[0].name + "\n" +
                            "Song: " + trackInfo[i].name + "\n" +
                            "Preview URL: " + trackInfo[i].preview_url + "\n" +
                            "Album: " + trackInfo[i].album.name + "\n"

                        console.log(spotifyResults);
                        console.log(' ');
                    };
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
};

// Object constructor and function OMDB Movie API.  Error handling is also functioned in.
function movieThis() {

    //using movieName from var list at top
    if (!movieName) {
        movieName = "Mr.Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // Both types of errors are included
        if (!error && response.statusCode === 200) {

            
            var myMovieData = JSON.parse(body);
            var queryUrlResults =
                "Title: " + myMovieData.Title + "\n" +
                "Year: " + myMovieData.Year + "\n" +
                "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
                "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
                "Country of Origin: " + myMovieData.Country + "\n" +
                "Language: " + myMovieData.Language + "\n" +
                "Plot: " + myMovieData.Plot + "\n" +
                "Actors: " + myMovieData.Actors + "\n"

            console.log(queryUrlResults);
        } else {
            console.log("error: " + err);
            return;
        };
    });
};


// Creates the random.txt file and enters the spotify criteria of the song listed below in there.  Error handling is also functioned in.
function doWhatItSays() {

    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
        trackName = txt[1];
        spotifyThisSong(trackName);

      });
};