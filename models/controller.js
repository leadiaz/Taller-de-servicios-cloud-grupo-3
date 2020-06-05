"use strict";
exports.__esModule = true;
var token = 'BQAg8nUJ240g7zAfH7CArd0AvVpFJ6_Z0v7n0a2USDi07fNHbV_dK7uVFbhQcOpjG6RrBIcQ3nIix1uMvWKqEn4QhmW4p5IzSZgYBx21dXtssKPHxfjebzvK8ksCru0h6wPhtrGVYEDc-e5Gpr41O1OOufGdZOic9GJ3aJ_55lvHjngXTA';
var rp = require('request-promise');
var options = {
    url: 'https://api.spotify.com/v1/search?q=AC%2FDC&type=artist',
    headers: { Authorization: 'Bearer ' + token },
    json: true
};
function getIdArtistDeSpotify(artistName) {
    return rp.get({
        url: 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist',
        headers: { Authorization: 'Bearer ' + token },
        json: true
    }).then(function (response) { return response.artists.items[0]; });
}
function albumesDeArtista(id) {
    return rp.get({
        url: 'https://api.spotify.com/v1/artists/' + id + '/albums',
        headers: { Authorization: 'Bearer ' + token },
        json: true
    }).then(function (albums) { return albums; });
}
function agregar(unqfy, artistName) {
    var idArtista;
    var namesAlbums = [];
    var albums = getIdArtistDeSpotify(artistName).then(function (artist) {
        unqfy.addArtist({ name: artist.name, country: "USA" });
        idArtista = artist.id;
        return albumesDeArtista(idArtista);
    });
    albums.then(function (albums) {
        albums.items.forEach(function (album) {
            if (!namesAlbums.includes(album.name)) {
                namesAlbums.push(album.name);
                unqfy.addAlbum(1, { name: album.name, year: album.release_date });
                console.log(unqfy.artists);
            }
        });
    });
}
//getIdArtistDeSpotify("AC/DC").then((id) => albumesDeArtista(id))
//rp.get(options).then((response)=> console.log(response.artists.items))
module.exports = { agregar: agregar };
