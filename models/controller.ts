
let token = 'BQAYem5k_A1gX9nbC-qGm4oCXQp-5D9v4i-kMkRjMlq7uU0wtuRHk24alMrKku6zNFqEPQc7lGCVpUjcyVRuqq2dx9usJ5jBuB6KVKnkH4ucvfL9BM0q_pkThdtycKoC354sPzs_DD2vUmHoq516snEO7MrCV560QdIeOtS9y3XNlxOT1Q'

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
 function albumesDeArtista(id) {
    return  rp.get({
          url: 'https://api.spotify.com/v1/artists/' +id + '/albums',
          headers: { Authorization: 'Bearer ' + token },
          json: true,
      }).then((albums) => {return albums})

 }

 function agregar(unqfy,artistName){
     let idArtista 
     const namesAlbums = []
     const albums =  getIdArtistDeSpotify(artistName).then((artist) => {
          //unqfy.addArtist({name: artist.name, country: "USA"});
          idArtista = artist.id
          return albumesDeArtista(idArtista)
     })
     albums.then((albums) => {
          albums.items.forEach(album => {
             if(!namesAlbums.includes(album.name)) { 
             namesAlbums.push(album.name)     
             unqfy.addAlbum(1,{name:album.name,year:album.release_date})
             console.log(unqfy.artists)
             }
        });
     }
 )
 }
rp.get(options).then((response)=> console.log(response.items[0].artists))
//getIdArtistDeSpotify("AC/DC").then((id) => albumesDeArtista(id))
//rp.get(options).then((response)=> console.log(response.artists.items))

module.exports = {agregar}