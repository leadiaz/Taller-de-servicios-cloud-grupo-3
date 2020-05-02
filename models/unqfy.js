'use strict';
exports.__esModule = true;
const artist_1 = require('./artist');
const album_1 = require('./album');
const track_1 = require('./track');
const playlist_1 = require('./playlist');
const artistExcepcion_1 = require('../Exceptions/artistExcepcion');
const trackExcepcion_1 = require('../Exceptions/trackExcepcion');
const searchResult_1 = require('./searchResult');
const user_1 = require('./user');
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const UNQfy = /** @class */ (function () {
  function UNQfy() {
    this.idArtist = 0;
    this.idAlbum = 0;
    this.idTrack = 0;
    this.idPlaylist = 0;
    this.idUser = 0;
    this.artists = new Array();
    this.playlists = new Array();
    // this.users = new Array()
  }
  UNQfy.prototype.getPorId = function (listaARecorrer, id, excepcion) {
    const elementEncontrado = listaARecorrer.find((element) => { return element.id === id; });
    if (!elementEncontrado) {
      throw excepcion;
    }
    else {
      return elementEncontrado;
    }
  };
  UNQfy.prototype.seachArtistByName = function (name) {
    const bool = this.artists.some((artist) => { return artist.name === name; });
    if (bool) {
      throw new artistExcepcion_1.ArtistExistsWithThatName('Ya existe ese artirta', 'No se pudo agregra ese artista', name);
    }
  };
  UNQfy.prototype.removeElem = function (listaARecorrer, elemAEliminar, excepcion) {
    if (listaARecorrer.indexOf(elemAEliminar) >= 0) {
      listaARecorrer.splice(elemAEliminar, 1);
    }
    else {
      throw excepcion;
    }
  };
  UNQfy.prototype.searchByName = function (nombre) {
    const result = new searchResult_1.SearchResult();
    this.artists.forEach((artist) => {
      if (artist.name.includes(nombre)) {
        result.addArtist(artist);
      }
      artist.albums.forEach((album) => {
        if (album.name.includes(nombre)) {
          result.addAbum(album);
        }
      });
      artist.getTracks().forEach((track) => {
        if (track.name.includes(nombre)) {
          result.addTrack(track);
        }
      });
    });
    this.playlists.forEach((playList) => { if (playList.name.includes(nombre)) {
      result.addPlaylist(playList);
    } });
    return result.toJSON();
  };
  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  UNQfy.prototype.addArtist = function (artistData) {
    /* Crea un artista y lo agrega a unqfy.
        El objeto artista creado debe soportar (al menos):
          - una propiedad name (string)
          - una propiedad country (string)
        */
    try {
      this.seachArtistByName(artistData.name);
    }
    catch (error) {
      if (error instanceof artistExcepcion_1.ArtistExistsWithThatName) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.nameArtist);
      }
    }
    const artista = new artist_1.Artist();
    artista.id = this.idArtist;
    artista.name = artistData.name;
    artista.country = artistData.country;
    this.idArtist += 1;
    this.artists.push(artista);
    return artista;
  };
  //Usuario
  UNQfy.prototype.addUser = function (name) {
    const user = new user_1.User();
    user.name = name;
    user.id = this.idUser;
    this.idUser += 1;
  };
  //MEJORAR 
  UNQfy.prototype.top3TracksDeUnArtista = function (artist) {
    const top3 = new Array();
    const tracksEscuchadosPorUsuarios = this.tracksEscuchadosByUsers();
    const tracksEscuchadosDeArtista = tracksEscuchadosPorUsuarios.filter((track) => { return artist.getTracks().includes(track); });
    const jsonOrdenado = this.cantDeVecesQueSeRepite(tracksEscuchadosDeArtista);
    this.ordenarListaDeJson(jsonOrdenado);
    let n = 0;
    while (n !== 3 && jsonOrdenado.length > 0) {
      top3.push(jsonOrdenado[n]);
      n = n - 1;
    }
    return top3;
  };
  UNQfy.prototype.ordenarListaDeJson = function (lista) {
    lista.sort((a, b) => {
      if (a.cant > b.cant) {
        return -1;
      }
      if (a.cant < b.cant) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
  };
  //Denota una array de json, [{track: track , cant: 0}]
  UNQfy.prototype.cantDeVecesQueSeRepite = function (listaRepetidas) {
    const _this = this;
    const newList = [];
    this.sinRepetidos(listaRepetidas).forEach((elem) => {
      newList.push({ numero: elem, cant: _this.count(elem, listaRepetidas) });
    });
    return newList;
  };
  UNQfy.prototype.sinRepetidos = function (list) {
    const newList = [];
    list.forEach((elem) => {
      if (!newList.includes(elem)) {
        newList.push(elem);
      }
    });
    return newList;
  };
  UNQfy.prototype.tracksEscuchadosByUsers = function () {
    return this.users.reduce((accumulator, user) => { return accumulator.concat(user.tracks); }, []);
  };
  UNQfy.prototype.count = function (elem, list) {
    let count = 0;
    for (let i = 0; i < list.length; ++i) {
      if (list[i] === elem)
        count++;
    }
    return count;
  };
  //remove artist
  UNQfy.prototype.removeArtist = function (aArtist) {
    let artist;
    try {
      artist = this.getArtistById(aArtist);
      const tracks = artist.getTracks();
      artist.removeAlbums();
      this.removeTracksFromPlayLists(tracks);
      this.removeElem(this.artists, artist, new Error('No existe el artista'));
    }
    catch (error) {
      console.log(error.message);
    }
  };
  //Denoto todos los tracks de los albumes
  UNQfy.prototype.tracksFromAlbumes = function (albumes) {
    let tracks = new Array();
    albumes.forEach((album) => {
      tracks = tracks.concat(album.tracks);
    });
    return tracks;
  };
  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  UNQfy.prototype.addAlbum = function (artistId, albumData) {
    /* Crea un album y lo agrega al artista con id artistId.
          El objeto album creado debe tener (al menos):
           - una propiedad name (string)
           - una propiedad year (number)
        */
    let album;
    try {
      const artist = this.getArtistById(artistId);
      album = artist.addAlbum(this.idAlbum, albumData);
    }
    catch (error) {
      console.log(error.message);
    }
    this.idAlbum += 1;
    return album;
  };
  UNQfy.prototype.removeAlbum = function (aAlbum) {
    let album;
    try {
      album = this.getAlbumById(aAlbum.id);
      const artist = this.getArtistById(aAlbum.idArtist);
      this.removeTracksFromPlayLists(album.tracks);
      artist.removeAlbum(aAlbum);
    }
    catch (e) {
      console.log(e.message);
    }
  };
  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  UNQfy.prototype.addTrack = function (albumId, trackData) {
    /* Crea un track y lo agrega al album con id albumId.
        El objeto track creado debe tener (al menos):
            - una propiedad name (string),
            - una propiedad duration (number),
            - una propiedad genres (lista de strings)
        */
    let track;
    try {
      track = this.getAlbumById(albumId).addTrack(this.idTrack, trackData);
    }
    catch (error) {
      console.log(error.message);
      if (error instanceof trackExcepcion_1.TrackExistsInAlbumError) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.trackName);
      }
    }
    this.idTrack += 1;
    return track;
  };
  UNQfy.prototype.removeTrack = function (aTrack) {
    let track;
    try {
      track = this.getTrackById(aTrack.id);
      this.getAlbumById(track.idAlbum).removeTrack(track);
    }
    catch (error) {
      console.log(error.message);
    }
    this.removeTrackFromPlayList(track); // si no se capturó ningún error se debería por eliminar de la playlist
  };
  //Elimina un track de todas las playList
  UNQfy.prototype.removeTrackFromPlayList = function (aTrack) {
    this.playlists.forEach((playlist) => {
      playlist.removeAtrack(aTrack);
    });
  };
  //Elimina los tracks de las playlists
  UNQfy.prototype.removeTracksFromPlayLists = function (tracksList) {
    this.playlists.forEach((playlist) => {
      tracksList.forEach((track) => {
        playlist.removeAtrack(track);
      });
    });
  };
  UNQfy.prototype.getArtistById = function (id) {
    return this.getPorId(this.artists, id, new Error('No existe el artista'));
  };
  UNQfy.prototype.getAlbums = function () {
    return this.artists.reduce((accumulator, artist) => { return accumulator.concat(artist.albums); }, []);
  };
  UNQfy.prototype.getAlbumById = function (id) {
    const albums = this.getAlbums();
    return this.getPorId(albums, id, new Error('No existes el album'));
  };
  UNQfy.prototype.getTracks = function () {
    return this.getAlbums().reduce((accumulator, album) => { return accumulator.concat(album.tracks); }, []);
  };
  UNQfy.prototype.getTrackById = function (id) {
    return this.getPorId(this.getTracks(), id, new Error('No existe el track'));
  };
  UNQfy.prototype.getPlaylistById = function (id) {
    return this.getPorId(this.playlists, id, new Error('No existe la playlist'));
  };
  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  UNQfy.prototype.getTracksMatchingGenres = function (genres) {
    return this.getTracks().filter((track) => { return track.anyGenre(genres); });
  };
  //retorna: los tracks de un genero en particular
  UNQfy.prototype.getTracksMatchingGenre = function (genre) {
    return this.getTracks().filter((track) => { return track.genres.includes(genre); });
  };
  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  UNQfy.prototype.getTracksMatchingArtist = function (artistName) {
    return this.artists.find((artist) => { return artist.name === artistName; }).getTracks();
  };
  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  UNQfy.prototype.createPlaylist = function (name, genresToInclude, maxDuration) {
    /*** Crea una playlist y la agrega a unqfy. ***
          El objeto playlist creado debe soportar (al menos):
            * una propiedad name (string)
            * un metodo duration() que retorne la duración de la playlist.
            * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
        */
    const playlist = new playlist_1.Playlist();
    const tracks = this.getTracksMatchingGenres(genresToInclude);
    playlist.id = this.idPlaylist;
    playlist.name = name;
    playlist.addTracks(tracks, maxDuration);
    this.playlists.push(playlist);
    return playlist;
  };
  UNQfy.prototype.removePlayList = function (aPlayList) {
    this.playlists.splice(this.playlists.indexOf(aPlayList), 1);
  };
  UNQfy.prototype.removePlayListById = function (id) {
    const playlist = this.getPlaylistById(id);
    this.playlists.splice(this.playlists.indexOf(playlist), 1);
  };
  // drop(){
  //   this.artists = new Array<Artist>()
  //   this.albums = new Array<Album>()
  //   this.tracks = new Array<Track>()
  //   this.playlists = new Array<Playlist>()
  // }
  UNQfy.prototype.evalMethod = function (metodo, argumentos) {
    switch (metodo) {
    case 'addArtist':
      this.addArtist({ name: argumentos[0], country: argumentos[1] });
      break;
    case 'addAlbum':
      this.addAlbum(argumentos[0], { name: argumentos[1], year: argumentos[2] });
      break;
    case 'addTrack':
      this.addTrack(argumentos[0], { name: argumentos[1], duration: argumentos[2], genres: argumentos[3] });
      break;
    case 'deleteArtist':
      //la implentacion de eliminar Artista
      break;
    case 'deleteAlbum':
      //deleteAlbum()
      break;
    case 'delete':
      //deleteTrack()
      break;
    case 'printArtist':
      //printArtist()
      break;
    case 'printAlbum':
      //printAlbum()
      break;
    case 'printTrack':
      //printTrack()
      break;
    case 'getTracksMatchingArtist':
      this.getTracksMatchingArtist(argumentos[0]);
      break;
    case 'getTracksMatchingGenres':
      this.getTracksMatchingGenres(argumentos[0]);
    case 'createPlaylist':
      this.createPlaylist(argumentos[0], argumentos[1], argumentos[2]);
    case 'searchByName':
      //implementar searchByName()
    default:
      console.log('no existe el metodo: ', typeof metodo);
    }
  };
  UNQfy.prototype.save = function (filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];
    const serializedData = picklify.picklify(this);
    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  };
  UNQfy.load = function (filename) {
    const serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, artist_1.Artist, album_1.Album, track_1.Track, playlist_1.Playlist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  };
  return UNQfy;
}());
exports.UNQfy = UNQfy;
// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
