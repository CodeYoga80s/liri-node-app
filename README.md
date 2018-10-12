PROJECT DESCRIPTION:
In this project, I have created LIRI.  LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

INTENDED PURPOSE:
LIRI allows one to conduct research on one of the topics of choice listed below via command line.  However, the user needs to request their own API keys and download the appropriate node packages to get started.  I have simplified the inquiry process by creating short and concise prompts to use when researching.  

•	Twitter – Displays your last 20 tweets.
•	Spotify – Given a song’s title via the command line, you can get album related details
•	OMDB – Retrieve details and ratings for your favorite movie, amongst other things.

HOW TO GET STARTED:
•	Request your Twitter, Spotify, and OMDB API Keys.
•	Download the package.json using the following command in Git Bash:

  o	npm init -y
  
•	Create a .env file and store your API keys in there.  Then create a key.js file which references your .env file to retrieve the keys.
•	Through command line, run the following commands to download the app related packages.

  o	Twitter API
    -->	npm install twitter
    
  o	Spotify API
    -->	Npm install  --save node-spotify-api
    
  o	DotEnv
    -->	Npm add dotenv
    
  o	FS
    -->	npm install fs

USING THE APP:
Type the following commands for each app:
  o	Twitter – Retrieves your last 20 tweets
    *	node liri.js my-tweets
  o	Spotify API– Retrieves album related details for the entered song.
    *	node liri.js spotify-this-song '<song name here>'
  o	OMDB – Retrieves movie details
    *	node liri.js movie-this '<movie name here>'
  o	Do What it Says – Runs the Spotify command listed in the random.txt file.
    *	node liri.js do-what-it-says

NEED HELP?
•	Please contact me at CodeYoga80s@gmail.com and I’ll reply at my earliest.

PROJECT ENHANCEMENT AND MAINTENANCE:
•	As of now, I am the only one contributing to the project.  However, your feedback is more than welcome so please feel free to send it to CodeYoga80s@gmail.com .
