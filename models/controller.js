"use strict";
exports.__esModule = true;
var token = 'BQDlf6yz2HRI6sDS2RKqz1ZUzSjN5eazQneMNfsdG6WGfESYvk9fXCFoMjitTXciMTEiuLvOXeUl6mgCFST7vuoGO8kPwpMy7FCd5FfATH9OQrANiBPpKk8Md6RIicYwOa_MXut3qwXodoSu6RmXbQK_ChrCfQm1fO80fyKJklrIpvtEsw';
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
        console.log(albums.items);
        return albums.items;
    });
}
exports.albumsArtistaPorName = albumsArtistaPorName;
