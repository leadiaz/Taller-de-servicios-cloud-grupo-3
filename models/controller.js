"use strict";
exports.__esModule = true;
var rp = require('request-promise');
var options = {
    url: 'https://api.spotify.com/v1/search?q=AC%2FDC&type=artist',
    headers: { Authorization: 'Bearer ' + 'BQA4m89akQ3bi_V0osbueCb7SFVMyC4OGjSgDPciJbSDrmMgiNCSKMsXCp6et6niVDfQDqu_oGjTHsiC24T_1qaxelMT1BYp9EnBXH3tbkF1sND4gMCtQYmuwbdWX0k1JodF_KJerKw5Bx1tzJ9H35jnEwUJegmJ4K1QdAKun-okgSrrHA' },
    json: true
};
function getIdArtistDeSpotify(artistName) {
    return rp.get({
        url: 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist',
        headers: { Authorization: 'Bearer ' + 'BQA4m89akQ3bi_V0osbueCb7SFVMyC4OGjSgDPciJbSDrmMgiNCSKMsXCp6et6niVDfQDqu_oGjTHsiC24T_1qaxelMT1BYp9EnBXH3tbkF1sND4gMCtQYmuwbdWX0k1JodF_KJerKw5Bx1tzJ9H35jnEwUJegmJ4K1QdAKun-okgSrrHA' },
        json: true
    }).then(function (response) { return response.artists.items[0].id; });
}
function albumesDeArtista(id) {
    return rp.get({
        url: 'https://api.spotify.com/v1/artists/' + id + '/albums',
        headers: { Authorization: 'Bearer ' + 'BQA4m89akQ3bi_V0osbueCb7SFVMyC4OGjSgDPciJbSDrmMgiNCSKMsXCp6et6niVDfQDqu_oGjTHsiC24T_1qaxelMT1BYp9EnBXH3tbkF1sND4gMCtQYmuwbdWX0k1JodF_KJerKw5Bx1tzJ9H35jnEwUJegmJ4K1QdAKun-okgSrrHA' },
        json: true
    }).then(function (albums) { return albums; });
}
function agregar(unqfy, artistName) {
    var idArtista;
    var albumes = [];
    var albums = getIdArtistDeSpotify(artistName).then(function (id) { idArtista = id; albumesDeArtista(id); });
    albums.then(function (albums) {
        albums.forEach(function (album) {
            unqfy.addAlbum(idArtista, { name: album.name, year: album.release_date });
        });
    });
}
getIdArtistDeSpotify("AC/DC").then(function (id) { return albumesDeArtista(id); });
//rp.get(options).then((response)=> console.log(response.artists.items))
module.exports = { agregar: agregar };
