"use strict";
exports.__esModule = true;
var assert = require('chai').assert;
var libunqfy = require('./models/unqfy');
var io = require('socket.io');
function createAndAddArtist(unqfy, artistName, country) {
    var artist = unqfy.addArtist({ name: artistName, country: country });
    return artist;
}
function createAndAddAlbum(unqfy, artistId, albumName, albumYear) {
    return unqfy.addAlbum(artistId, { name: albumName, year: albumYear });
}
function createAndAddTrack(unqfy, albumName, trackName, trackDuraction, trackGenres) {
    return unqfy.addTrack(albumName, { name: trackName, duration: trackDuraction, genres: trackGenres });
}
function createAndAddUser(unqfy, name) {
    return unqfy.addUser(name);
}
describe('Add, remove and filter data', function () {
    var unqfy = null;
    beforeEach(function () {
        unqfy = new libunqfy.UNQfy();
    });
    it('should add an artist', function () {
        var artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        assert.equal(artist.name, 'Guns n\' Roses');
        assert.equal(artist.country, 'USA');
    });
    it('should add an album to an artist', function () {
        var artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        var album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        assert.equal(album.name, 'Appetite for Destruction');
        assert.equal(album.year, 1987);
    });
    it('should add a track to an album', function () {
        var artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        var album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        var track = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        assert.equal(track.name, 'Welcome to the jungle');
        assert.strictEqual(track.duration, 200);
        assert.equal(track.genres.includes('rock'), true);
        assert.equal(track.genres.includes('hard rock'), true);
        assert.lengthOf(track.genres, 2);
    });
    it('should find different things by name', function () {
        var artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        var album1 = createAndAddAlbum(unqfy, artist1.id, 'Roses Album', 1987);
        var track = createAndAddTrack(unqfy, album1.id, 'Roses track', 200, ['pop', 'movie']);
        var playlist = unqfy.createPlaylist('Roses playlist', ['pop'], 1400);
        var results = unqfy.searchByName('Roses');
        assert.deepEqual(results, {
            artists: [artist1],
            albums: [album1],
            tracks: [track],
            playlists: [playlist]
        });
    });
    it('should get all tracks matching genres', function () {
        var artist1 = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        var album1 = createAndAddAlbum(unqfy, artist1.id, 'Appetite for Destruction', 1987);
        var t0 = createAndAddTrack(unqfy, album1.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
        var t1 = createAndAddTrack(unqfy, album1.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);
        var artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        var album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
        var t2 = createAndAddTrack(unqfy, album2.id, 'Trhiller', 200, ['pop', 'movie']);
        createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['classic']);
        var t3 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['movie']);
        var tracksMatching = unqfy.getTracksMatchingGenres(['pop', 'movie']);
        // assert.equal(tracks.matching.constructor.name, Array);
        assert.isArray(tracksMatching);
        assert.lengthOf(tracksMatching, 4);
        assert.equal(tracksMatching.includes(t0), true);
        assert.equal(tracksMatching.includes(t1), true);
        assert.equal(tracksMatching.includes(t2), true);
        assert.equal(tracksMatching.includes(t3), true);
    });
    it('should get all tracks matching artist', function () {
        var artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        var album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        var t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
        var t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);
        var album2 = createAndAddAlbum(unqfy, artist.id, 'Use Your Illusion I', 1992);
        var t3 = createAndAddTrack(unqfy, album2.id, 'Don\'t Cry', 500, ['rock', 'hard rock']);
        var artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        var album3 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
        createAndAddTrack(unqfy, album3.id, 'Thriller', 200, ['pop', 'movie']);
        createAndAddTrack(unqfy, album3.id, 'Another song', 500, ['classic']);
        createAndAddTrack(unqfy, album3.id, 'Another song II', 500, ['movie']);
        var matchingTracks = unqfy.getTracksMatchingArtist(artist.name); // agregue el artist.name antes estaba artist
        assert.isArray(matchingTracks);
        assert.lengthOf(matchingTracks, 3);
        assert.isTrue(matchingTracks.includes(t1));
        assert.isTrue(matchingTracks.includes(t2));
        assert.isTrue(matchingTracks.includes(t3));
    });
});
describe('Playlist Creation and properties', function () {
    var unqfy = null;
    beforeEach(function () {
        unqfy = new libunqfy.UNQfy();
    });
    it('should create a playlist as requested', function () {
        var artist = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
        var album = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
        var t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
        createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);
        var artist2 = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
        var album2 = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
        var t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);
        var t3 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['pop']);
        var t4 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['pop']);
        var playlist = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);
        assert.equal(playlist.name, 'my playlist');
        assert.isAtMost(playlist.duration(), 1400);
        assert.isTrue(playlist.hasTrack(t1));
        assert.isTrue(playlist.hasTrack(t2));
        assert.isTrue(playlist.hasTrack(t3));
        assert.isTrue(playlist.hasTrack(t4));
        assert.lengthOf(playlist.tracks, 4);
    });
});
describe('User Creation', function () {
    var unqfy = null;
    beforeEach(function () {
        unqfy = new libunqfy.UNQfy();
    });
    it('create a user as requested', function () {
        var user1 = createAndAddUser(unqfy, 'Pepito');
        var user2 = createAndAddUser(unqfy, 'Gonzalo');
        var user3 = createAndAddUser(unqfy, 'PEDRO');
        var user4 = createAndAddUser(unqfy, "Jorge");
        var pepito = unqfy.getElem('Pepito', unqfy.users, new Error('No se encontro elemento'));
        assert.equal(user1.name, 'Pepito');
        assert.equal(user2.name, 'Gonzalo');
        assert.equal(pepito.name, 'Pepito');
        //assert.equal(unqfy.getElem('jorge',unqfy.users,new Error('No se encontro elemento')),new Error('No se encontro elemento'))
    });
});
