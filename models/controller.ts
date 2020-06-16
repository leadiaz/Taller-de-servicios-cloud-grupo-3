const tokenAccess = require('../spotifyCreds.json');
let token = tokenAccess.access_token;

const rp = require('request-promise');
const options = {
     url: "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj/tracks?offset=0&limit=50",
     headers: { Authorization: 'Bearer ' + token },
     json: true,
};


function getIdArtistDeSpotify(artistName) {
    return rp.get({
      url: 'https://api.spotify.com/v1/search?q='+ artistName+ '&type=artist',
      headers: { Authorization: 'Bearer ' + token},
      json: true,
    }).then((response) => {return response.artists.items[0]})
 }
 
 function albumesDeArtistaPorId(id) {
    return  rp.get({
          url: 'https://api.spotify.com/v1/artists/' +id + '/albums',
          headers: { Authorization: 'Bearer ' + token },
          json: true,
      }).then((albums) => {return albums})

 }

 export function albumsArtistaPorName(artistName){
   return  getIdArtistDeSpotify(artistName)
     .then((artist) => albumesDeArtistaPorId(artist.id))
     .then((albums) =>  {
       return albums.items
      }
   
 )
 }


