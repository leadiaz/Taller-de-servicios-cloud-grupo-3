import {Artist} from "./artist"
import {Album} from './album'
import {Track} from './track'
import {Playlist} from './playlist'
import { ArtistExistsWithThatName } from "../Exceptions/artistExcepcion";
import {TrackExistsInAlbumError} from "../Exceptions/trackExcepcion"
import { SearchResult } from "./SearchResult";



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

    private seachArtistByName(name){
      const bool = this.artists.some(artist=> artist.name === name)
      if(bool){
        throw new ArtistExistsWithThatName('Ya existe ese artirta','No se pudo agregra ese artista',name);
      }
    }
    
    //Error si el track ya existe en algun album de unqfy
    private existTrackInAlbum(atrack){
      const bool = this.albums.some(album=> album.tracks.some(track=> track.name === atrack))
      if(bool){
        throw new TrackExistsInAlbumError('TrackExistsInAlbumError','Ya existe el track en algun album',atrack);
      }
    }


    private removeElem(listaARecorrer,elemAEliminar,excepcion){
      if(listaARecorrer.indexOf(elemAEliminar) >= 0){
        listaARecorrer.splice(elemAEliminar,1)
      }
      else{
         throw excepcion;
      }
    }

    searchByName(nombre:string) {
      const result:SearchResult = new SearchResult()
      this.artists.forEach((artist) =>{ if(artist.name.includes(nombre)){result.addArtist(artist)}})
      this.albums.forEach((album) =>{ if(album.name.includes(nombre)){result.addAbum(album)}})
      this.tracks.forEach((track) =>{ if(track.name.includes(nombre)){result.addTrack(track)}})
      this.playlists.forEach((playList) =>{ if(playList.name.includes(nombre)){result.addPlaylist(playList)}})
      return result
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
 try{
  this.seachArtistByName(artistData.name)
 }
 catch(error){
   if(error instanceof ArtistExistsWithThatName){
       console.log(error.name)
       console.log(error.message)
       console.log(error.nameArtist)
   }
  
 }
    const artista = new Artist();
    artista.id = this.idArtist;
    artista.name = artistData.name;
    artista.country = artistData.country;
    this.idArtist += 1
    this.artists.push(artista)
    return artista;
  }

  //remove artist
  removeArtist(aArtist){ 
    this.removeElem(this.artists,aArtist,new Error('No existe el artista'))
    
  }

  //Elimino por id
  removeArtistById(id){
    const artist: Artist = this.getArtistById(id)
    const tracksFromArtist = this.tracksFromAlbumes(artist.albums)
    this.artists.splice(this.artists.indexOf(artist),1)
    this.removeTracksFromPlayLists(tracksFromArtist)


  }
  //Denoto todos los tracks de los albumes
 private tracksFromAlbumes(albumes:Array<Album>){
    var tracks:Array<Track> = new Array()
    albumes.forEach((album)=>{
      tracks = tracks.concat(album.tracks)
    })
    return tracks
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

  removeAlbum(aAlbum){
    this.removeElem(this.albums,aAlbum,new Error('No existe el Album'))

  }

  removeAlbumById(id){
    const album:Album = this.getAlbumById(id)
    const tracksFromAlbum = album.tracks
    this.albums.splice(this.albums.indexOf(album),1)
    this.removeTracksFromPlayLists(tracksFromAlbum)
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
      this.existTrackInAlbum(trackData.name)
    }catch(error){
      console.log(error.message);
      if(error instanceof TrackExistsInAlbumError) {
        console.log(error.name)
        console.log(error.message)
        console.log(error.trackName)
      }
            
    }
    this.idTrack += 1
    this.tracks.push(track)
    return track;
  }
  

  removeTrack(aTrack){
    this.removeElem(this.tracks,aTrack,new Error('No existe el Track'))

  }
  //Elimino por id
  removeTrackById(id){
    const track:Track = this.getTrackById(id)
    this.tracks.splice(this.tracks.indexOf(track),1)
    this.removeTrackFromPlayList(track)
  }
  
  //Elimina un track de todas las playList
  private removeTrackFromPlayList(aTrack){
    this.playlists.forEach((playlist)=>{
      playlist.removeAtrack(aTrack)
    })
  }

  
 //Elimina los tracks de las playlists
  private removeTracksFromPlayLists(tracksList){
    this.playlists.forEach((playlist) =>{
        tracksList.forEach(track => {
          playlist.removeAtrack(track)
        });
    })

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
    return playlist;
  }


  removePlayList(aPlayList){
    this.playlists.splice(this.playlists.indexOf(aPlayList),1)

  }
  
  removePlayListById(id){
    const playlist = this.getPlaylistById(id)
    this.playlists.splice(this.playlists.indexOf(playlist),1)
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



