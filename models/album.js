'use strict';
exports.__esModule = true;
const track_1 = require('./track');
const trackExcepcion_1 = require('../Exceptions/trackExcepcion');
const Album = /** @class */ (function () {
  function Album(idArtist, id, name, year, tracks) {
    this.idArtist = idArtist;
    this.id = id;
    this.name = name;
    this.year = year;
    this.tracks = tracks;
    this.tracks = new Array();
  }
  Album.prototype.toJSON = function () {
    return { idArtist: this.idArtist, id: this.id, name: this.name, year: this.year, tracks: this.tracks };
  };
  Album.prototype.addTrack = function (idTrack, trackData) {
    if (this.existeTrack(trackData.name)) {
      throw new trackExcepcion_1.TrackExistsInAlbumError(trackData.name);
    }
    else {
      const track = new track_1.Track();
      track.id = this.id;
      track.name = trackData.name;
      track.duration = trackData.duration;
      track.genres = !trackData.genres ? new Array() : trackData.genres;
      this.tracks.push(track);
      return track;
    }
  };
  Album.prototype.removeTracks = function () {
    this.tracks = null;
  };
  Album.prototype.removeTrack = function (anTrack) {
    const index = this.tracks.indexOf(anTrack);
    this.tracks.splice(index, 1);
  };
  Album.prototype.existeTrack = function (name) {
    return this.tracks.some((track) => { return track.name === name; });
  };
  return Album;
}());
exports.Album = Album;
