"use strict";
exports.__esModule = true;
var albumException_1 = require("../Exceptions/albumException");
var SearchResult = /** @class */ (function () {
    function SearchResult(artists, albums, playlists, tracks) {
        this.artists = artists;
        this.albums = albums;
        this.playlists = playlists;
        this.tracks = tracks;
        this.albums = [];
        this.artists = [];
        this.playlists = [];
        this.tracks = [];
    }
    SearchResult.prototype.toJSON = function () {
        return { "artists": this.artists, "albums": this.albums, "tracks": this.tracks, "playlists": this.playlists };
    };
    SearchResult.prototype.addAbum = function (album) {
        if (this.existeAlbum(album.name)) {
            throw new albumException_1.AlbumExistsInArtistError(album.name);
        }
        this.albums.push(album);
    };
    SearchResult.prototype.addArtist = function (artist) {
        this.artists.push(artist);
    };
    SearchResult.prototype.addPlaylist = function (playlist) {
        this.playlists.push(playlist);
    };
    SearchResult.prototype.addTrack = function (track) {
        this.tracks.push(track);
    };
    SearchResult.prototype.existeAlbum = function (name) {
        return this.albums.some(function (album) {
            return album.name === name;
        });
    };
    return SearchResult;
}());
exports.SearchResult = SearchResult;
