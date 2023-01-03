require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node')

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));


    //spotifyApi
    spotifyApi.searchArtists()
    .searchArtists(/*'HERE GOES THE QUERY ARTIST'*/)
    .then(data => {
      console.log('The received data from the API: ', data.body);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));


// Our routes go here:

app.get('/', (req,res,next) =>{

spotifyApi.searchArtists('madonna')
.then((data)=>{
    console.log(data.body.artists.items[0])
})
.catch (err => console.log ('this:',err))

    res.send('check your console')

})


app.get('/', (req, res) => {
    res.render('homePage');
  });


  



app.listen(3001, () => console.log('My Spotify project running on port 3001 🎧 🥁 🎸 🔊'));
