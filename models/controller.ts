import { Album } from "./album";

let token = 'BQAIuvEn1HtvF-7PH5vuqZWfWu9J-BCvW4qt6J6vQrkH2CgN5-e4fV_TmYa8j9PIe47BEFtZyzggzszok8bPfHZFB7n2TsSYqW4dw-f-Ew-AsYLugJ1hoNym5TwJNnPDxYJaeLwDvVRXjp1GEps3mZHOYsGk0Qg_'

const rp = require('request-promise');
const options = {
     url: 'https://api.spotify.com/v1/search?q=AC%2FDC&type=artist',
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
     const albumes = []
     const albums =  getIdArtistDeSpotify(artistName).then((artist) => {
          unqfy.addArtist({name: artist.name, country: "USA"});
          idArtista = artist.id
          return albumesDeArtista(idArtista)
     })
     albums.then((albums) => {
          albums.forEach(album => {
             unqfy.addAlbum(idArtista,{name:album.name,year:album.release_date})
        });
     }
 )
 }

getIdArtistDeSpotify("AC/DC").then((id) => albumesDeArtista(id))
//rp.get(options).then((response)=> console.log(response.artists.items))

module.exports = {agregar}