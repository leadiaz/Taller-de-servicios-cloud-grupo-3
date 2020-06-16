"use strict";
exports.__esModule = true;
var token = 'BQAoAPACspyWDnXxTv1PrFB2m0aJRW4n1-v6fXQlYmk2aoRhcGZ8QCy3TGFpc4NRt4Kfr9oMfdMno1FelwhAu8jjxIxO5Ld_9IsfeGDg13gBTl9pUGuYamX-lxlamacICEVtPqAa8mrOxhMyYk_hWUiOhKIJHdzngMhjJb3Uxlb18vOZEg';
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
