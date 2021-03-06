//using .env to hide keys
require("dotenv").config();

//project vars
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require("request");
var liriReturn = process.argv[2];
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var term = process.argv.slice(3).join(" ");
runProgram();
// Using the switch statement in place of if statements for the defined functions below.  This statement will execute the desired command by the users.
function runProgram(){
switch (liriReturn) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
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
}

// Object constructor and function for my tweets.  Error handling is also functioned in.
function myTweets() {
    var params = { screen_name: 'CodeYoga80s' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // var object = JSON.parse(response);
            // console.log("this is the " + object);
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
function spotifyThisSong() {
    if (!term) {
        term = "The Sign";
    };
    songRequest = term;
    spotify.search({
        type: "track",
        query: songRequest
    },
        function (err, data) {
            if (!err) {
                var trackInfo = data.tracks.items;
                for (var i = 0; i < trackInfo.length; i++) {
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
    if (!term) {
        term = "Mr.Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

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
        liriReturn = txt[0];
        term = txt[1];
        runProgram();
      });
};