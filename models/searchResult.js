'use strict';
exports.__esModule = true;
const albumException_1 = require('../Exceptions/albumException');
const SearchResult = /** @class */ (function () {
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
        return this.albums.some((album) => {
            return album.name === name;
        });
    };
    return SearchResult;
}());
exports.SearchResult = SearchResult;
