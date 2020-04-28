"use strict";
exports.__esModule = true;
var SearchResult = /** @class */ (function () {
    function SearchResult(artists, albums, playlists, tracks) {
        this.artists = artists;
        this.albums = albums;
        this.playlists = playlists;
        this.tracks = tracks;
        this.albums = new Array();
        this.artists = new Array();
        this.playlists = new Array();
        this.tracks = new Array();
    }
    SearchResult.prototype.toJSON = function () {
        return { artists: this.artists, albums: this.albums, tracks: this.tracks, playlists: this.playlists };
    };
    SearchResult.prototype.addAbum = function (album) {
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
    return SearchResult;
}());
exports.SearchResult = SearchResult;
