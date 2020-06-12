"use strict";
exports.__esModule = true;
var token = 'BQA1Z2YDDi8OQIRT9gnhw8y9fzRiCVaCy3nplaDwrUDRGOG2fZgvNUyOCRwSSUvLYzI5YnTFwjjjG3p72ZaDNHd7sONrA-Xbko6An6zjTgeR2M1UHtHBQbtTTekjOzmveTX0Rbn6F3fXf04npGRCwB3R47H9SpM7VLLgI-SZIF2H18SKiw';
var rp = require('request-promise');
var options = {
    url: "https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj/tracks?offset=0&limit=50",
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
function albumesDeArtistaPorId(id) {
    return rp.get({
        url: 'https://api.spotify.com/v1/artists/' + id + '/albums',
        headers: { Authorization: 'Bearer ' + token },
        json: true
    }).then(function (albums) { return albums; });
}
function albumsArtistaPorName(artistName) {
    return getIdArtistDeSpotify(artistName)
        .then(function (artist) { return albumesDeArtistaPorId(artist.id); })
        .then(function (albums) {
        return albums.items;
    });
}
exports.albumsArtistaPorName = albumsArtistaPorName;
