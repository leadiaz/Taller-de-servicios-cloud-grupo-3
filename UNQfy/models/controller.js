"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
var tokenAccess = require('../spotifyCreds.json');
var token = tokenAccess.access_token;
var rp = require('request-promise');
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
