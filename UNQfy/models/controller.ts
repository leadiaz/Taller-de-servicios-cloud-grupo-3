/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const tokenAccess = require('../spotifyCreds.json');
const token = tokenAccess.access_token;

const rp = require('request-promise');


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

 export function albumsArtistaPorName(artistName: any){
   return  getIdArtistDeSpotify(artistName)
     .then((artist) => albumesDeArtistaPorId(artist.id))
     .then((albums) =>  {
       return albums.items
      }
   
 )
 }


