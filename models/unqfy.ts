import {Artist} from "./artist"
import {Album} from './album'
import {Track} from './track'
import {Playlist} from './playlist'

const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy

 export class UNQfy {
    artists: Array<Artist>
    albums: Array<Album>
    tracks: Array<Track>
    playlists: Array<Playlist>

    private idArtist = 0
    private idAlbum = 0
    private idTrack = 0
    private idPlaylist = 0
    
    private listeners: any[]
    

    constructor(){
      this.artists = new Array()
      this.albums = new Array()
      this.tracks = new Array()
      this.playlists = new Array()
    }

    private getPorId(listaARecorrer, id, excepcion){
      const elementEncontrado = listaARecorrer.find(element => element.id === id);
      if(!elementEncontrado){
        throw excepcion;
      }else{
        return elementEncontrado;
      }
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
    const artista = new Artist();
    artista.id = this.idArtist;
    artista.name = artistData.name;
    artista.country = artistData.country;
    this.idArtist += 1
    this.artists.push(artista)
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
    album.id = this.idAlbum;
    album.name = albumData.name;
    album.year =albumData.year;
    try{
      this.getArtistById(artistId).addAlbum(album);
    }catch(error){
      console.log(error.message);
    }
    this.idAlbum += 1
    this.albums.push(album)
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
    track.id = this.idTrack;
    track.name = trackData.name;
    track.duration = trackData.duration;
    track.genres = trackData.genres;
    try{
      this.getAlbumById(albumId).addTrack(track);
    }catch(error){
      console.log(error.message);
    }
    this.idTrack += 1
    this.tracks.push(track)
    return track;
  }

  getArtistById(id) {
    return this.getPorId(this.artists, id, new Error('No existe el artista')); 
  }

  getAlbumById(id) {
    return this.getPorId(this.albums, id,new Error('No existes el album'));
  }

  getTrackById(id) {
    return this.getPorId(this.tracks, id, new Error('No existe el track'));
  }

  getPlaylistById(id) {
    return this.getPorId(this.playlists, id, new Error('No existe la playlist'));
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres:Array<String>) {
    return this.tracks.filter(track => track.anyGenre(genres))
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(artistName) {
    return this.artists.find(artist => artist.name === artistName).getTracks()
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
    const playlist = new Playlist()
    const tracks = this.getTracksMatchingGenres(genresToInclude)

    playlist.id = this.idPlaylist
    playlist.name = name

    playlist.addTracks(tracks, maxDuration)
    this.playlists.push(playlist)
  }
  // drop(){
  //   this.artists = new Array<Artist>()
  //   this.albums = new Array<Album>()
  //   this.tracks = new Array<Track>()
  //   this.playlists = new Array<Playlist>()
  // }

  evalMethod(metodo:string, argumentos:Array<any>){
        switch (metodo) {
            case 'addArtist':
                this.addArtist({name: argumentos[0], country: argumentos[1]})
                break
            case  'addAlbum':
                this.addAlbum(argumentos[0], {name: argumentos[1], year: argumentos[2]})
                break
            case 'addTrack':
                this.addTrack(argumentos[0],{name: argumentos[1], duration: argumentos[2], genres: argumentos[3]})
                break
            case 'deleteArtist':
                //la implentacion de eliminar Artista
                break
            case 'deleteAlbum':
                //deleteAlbum()
                break
            case 'delete':
                //deleteTrack()
                break
            case 'printArtist':
                //printArtist()
                break
            case 'printAlbum':
                //printAlbum()
                break
            case 'printTrack':
                //printTrack()
                break
            case 'getTracksMatchingArtist':
                this.getTracksMatchingArtist(argumentos[0])
                break
            case 'getTracksMatchingGenres':
                this.getTracksMatchingGenres(argumentos[0])
            case 'createPlaylist':
                this.createPlaylist(argumentos[0], argumentos[1], argumentos[2])
            case 'searchByName':
                //implementar searchByName()
            default :
                console.log("no existe el metodo: ", typeof metodo)
        }
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
    const classes = [UNQfy, Artist, Album, Track, Playlist];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente



