
let token = 'BQA1IAOUiImjeUisc3FS9_HOrQAbM-AlVsiaGp83z3ptNswrioJfC6rOektlXpPekiBm9gs5jrTtIjVE_yBNY-My0NzFNHa6sXt__0sr9gfAUCByQrn0o3XP9gf_M_i_ShvX37t5UosYM8YTyzFgDtgCO5jCHKb9GAqBAZi_yJsYUH7Emg'

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
     let idArtistaSpotify
     const namesAlbums = []
     const albums =  getIdArtistDeSpotify(artistName).then((artist) => {
          idArtistaSpotify = artist.id
          return albumesDeArtista(idArtistaSpotify)
     })
     albums.then((albums) => {
          albums.items.forEach(album => {
             if(!namesAlbums.includes(album.name)) { 
             namesAlbums.push(album.name)
             const idArtistUnqFy = unqfy.getArtist(artistName).id  
             unqfy.addAlbum(idArtistUnqFy,{name:album.name,year:album.release_date})
             //console.log(unqfy.getArtist(artistName).albums)
            // console.log(unqfy)
             }
        });
     }
 )
 }
//rp.get(options).then((response)=> console.log(response.items[0].artists))
//getIdArtistDeSpotify("AC/DC").then((id) => albumesDeArtista(id))
//rp.get(options).then((response)=> console.log(response.artists.items))

module.exports = {agregar}