'use strict';
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artist = require('./models/artist');
const Album = require('./models/album');
const Track = require('./models/track');


const artistas = new Array();
const albumes = new Array();
const tracks = new Array();
const playlist = new Array();


// funcion auxiliar para obtener un elemento del array, si no la encuentra
// lanza una excepcion 
const getPorId= (listaARecorrer, id, excepcion) =>{
  const elementEncontrado = listaARecorrer.find(element => element.id === id);
  if(!elementEncontrado){
    throw excepcion;
  }else{
    return elementEncontrado;
  }
};


class UNQfy {
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
    const artista = new Artist();
    artista.id = artistas.length;
    artista.name = artistData.name;
    artista.country = artistData.country;
    return artista;
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
    const album = new Album();
    album.id = albumes.length;
    album.name = albumData.name;
    album.year =albumData.year;
    artistas.forEach( artista => {
      if(artista.id === artistId){
        artista.addAlbum(album);
      }
    });
    return album;
    
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
    const track = new Track();
    track.id = tracks.length;
    track.name = trackData.name;
    track.duration = trackData.duration;
    track.genres = trackData.genres;
    albumes.forEach(album => {
      if(album.id === albumId){
        console.log(album);
        album.addTrack(track);
      }
    });
    return track;
  }

  getArtistById(id) {
    return getPorId(artistas, id, new Error('No existe el artista')); 
  }

  getAlbumById(id) {
    return getPorId(albumes, id,new Error('No existes el album'));
  }

  getTrackById(id) {
    return getPorId(tracks, id, new Error('No existe el track'));
  }

  getPlaylistById(id) {
    return getPorId(playlist, id, new Error('No existe la playlist'));
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
    const classes = [UNQfy, Artist, Album, Track];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

