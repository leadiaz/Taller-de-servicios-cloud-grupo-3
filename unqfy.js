
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');
const PlayList = require('./models/playlist')
const IDAutoIncremental = require('./models/IdAutoIncremental')
const idAutoIncremental = new IDAutoIncremental()





class UNQfy {
    constructor(){
      this.artists = new Array()
      this.albumes = new Array()
      this.playlists = new Array()
      this.tracks = new Array()
    }

    

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const artist = new Artist()
    artist.id = IDAutoIncremental.getId()
    artist.name = artistData.name
    artist.country = artistData.country
    this.artists.push(artist)
  }


  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
   const artist = this.getAlbumById(artistId)
   const album = new Album()
   album.name = albumData.name
   album.year = albumData.year
   album.id = idAutoIncremental.getId()
   artist.addAlbum(album)

   
  }


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)

  */
    const album = this.getAlbumById(albumId)
    const track = new Track()
    track.name = trackData.name
    track.duration = trackData.duration
    track.genres = trackData.genres
    track.id = idAutoIncremental.getId()

  }

  getArtistById(id) {
    return this.artists.find(artist=> artist.id ===id )

  }

  getAlbumById(id) {
    return this.albumes.find(album=>album.id === id)

  }

  getTrackById(id) {
    return this.tracks.find(track=>track.id ===id)

  }

  getPlaylistById(id) {
    return this.playlists.find(playlist=> playlist.id === id)

  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {

  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {

  }


  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */

  }

  save(filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,Artist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,Artist,Album,Track
};

