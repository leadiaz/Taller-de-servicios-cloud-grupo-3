
let token = 'BQA1Z2YDDi8OQIRT9gnhw8y9fzRiCVaCy3nplaDwrUDRGOG2fZgvNUyOCRwSSUvLYzI5YnTFwjjjG3p72ZaDNHd7sONrA-Xbko6An6zjTgeR2M1UHtHBQbtTTekjOzmveTX0Rbn6F3fXf04npGRCwB3R47H9SpM7VLLgI-SZIF2H18SKiw'

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


