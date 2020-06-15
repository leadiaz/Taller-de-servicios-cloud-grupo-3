
let token = 'BQBpR_Kh-pW_VL-8rRIpx3BVMh9fkc9XQx5hgZ6YDBLhk7h7uSfZ99l-vkXUG_721ePyhmgg9mS0QDgYB4f7fjDXMWlO5WxzmmUhgu5Z2oeFt7q_kB3jXWY50sagKz9kMXz_G5xVgaXVHAAj3giDSbPqzRNnMEDlFnEFFo0F1sarlWEfiA'

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


