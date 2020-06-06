
let token = 'BQD1htPBGeJiEwv_SP1SMgwsLo0Nr1xfK7SkXjDYulWKtrgxgoiaR2nNbveMXjjc_t9g27MFWewtw27rYLh7nXpEpcceAtagT2JP-By7YZQDcnxLKfXfGulR1MNEjDvDBgVRJlzVg_Djd_WiA7vdMjW4-qMohGpLgX_uCKVTEyIfT5RpzA'

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
     // const namesAlbums = []
     // const idArtistUnqFy = unqfy.getArtist(artistName).id 
   return  getIdArtistDeSpotify(artistName)
     .then((artist) => albumesDeArtista(artist.id))
     .then((albums) =>  {return albums.items}
          //    albums.items.forEach(album => {
           
          //    namesAlbums.push(album.name)
          //    unqfy.addAlbum(idArtistUnqFy,{name:album.name,year:album.release_date})
          //    console.log(unqfy)
           
             
       // }),
     // console.log(unqfy)  

     
 )


// unqfy.addAlbum(1,{name:"pepepep",year:22222})
 }
//rp.get(options).then((response)=> console.log(response.items[0].artists))
//getIdArtistDeSpotify("AC/DC").then((id) => albumesDeArtista(id))
//rp.get(options).then((response)=> console.log(response.artists.items))

module.exports = {agregar}