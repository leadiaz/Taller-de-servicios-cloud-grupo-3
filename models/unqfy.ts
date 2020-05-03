import {Artist} from "./artist"
import {Album} from './album'
import {Track} from './track'
import {Playlist} from './playlist'
import { ArtistExistsWithThatName } from "../Exceptions/artistExcepcion";
import {TrackExistsInAlbumError} from "../Exceptions/trackExcepcion"
import { SearchResult } from "./searchResult";
import { User } from "./user";



const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy

 export class UNQfy {
    artists: Array<Artist>
    playlists: Array<Playlist>
    users:Array<User>

    private idArtist = 0
    private idAlbum = 0
    private idTrack = 0
    private idPlaylist = 0
    private idUser = 0 
    
    private listeners: any[]
    

    constructor(){
      this.artists = new Array()
      this.playlists = new Array()
      // this.users = new Array()
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
      this.artists.forEach((artist) =>{
          if(artist.name.includes(nombre)){
              result.addArtist(artist)
          }
          artist.albums.forEach(album => {
              if(album.name.includes(nombre)){
                  result.addAbum(album)
              }
          })
          artist.getTracks().forEach(track => {
              if(track.name.includes(nombre)){
                  result.addTrack(track)
              }
          })

      })
      this.playlists.forEach((playList) =>{ if(playList.name.includes(nombre)){result.addPlaylist(playList)}})
      return result.toJSON()
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

  //Usuario
    addUser(name){
    const user = new User()
     user.name = name
     user.id = this.idUser
     this.idUser += 1
    }

    //Denota top3 de los tracks mas escuchados por un artista  
    top3TracksDeUnArtista(artist:Artist){
      const top3  = new Array()
      const tracksEscuchadosDeArtista = this.tracksEscuchadosByUsers().filter(track=> artist.getTracks().includes(track))  
      const jsonOrdenado = this.cantDeVecesQueSeRepite(tracksEscuchadosDeArtista)
      this.ordenarListaDeJson(jsonOrdenado)
      var n = 0
      while(n!== 3 && jsonOrdenado.length > n){
        top3.push(jsonOrdenado[n].track)
        n = n+1

      }
      return top3
      
    }



     private ordenarListaDeJson(lista){
      lista.sort(function (a, b) {
        if (a.cant > b.cant) {
          return -1;
        }
        if (a.cant < b.cant) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      }
    
    //Denota una array de json, [{track: track , cant: 0}]
   private cantDeVecesQueSeRepite(listaRepetidas){
      var newList = []
      User.sinRepetidos(listaRepetidas).forEach((elem) => {
         newList.push({numero:elem,cant: this.count(elem,listaRepetidas)})
       })
       return newList
    }
    private tracksEscuchadosByUsers():Array<Track>{
      return this.users.reduce((accumulator, user) => {return accumulator.concat(user.tracks)}, [])
    }

    private count(elem,list){
      var count = 0;
      for(var i = 0; i < list.length; ++i){
          if(list[i] === elem)
              count++;
      }
      return count
       
      }

  //remove artist
  removeArtist(aArtist){
    let artist
    try{
        artist = this.getArtistById(aArtist)
        const tracks = artist.getTracks()
        artist.removeAlbums()
        this.removeTracksFromPlayLists(tracks)
        this.removeElem(this.artists,artist,new Error('No existe el artista'))
    }catch(error){
        console.log(error.message)
    }

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
    let album
    try{
      const artist = this.getArtistById(artistId) 
        album = artist.addAlbum(this.idAlbum, albumData)
    }catch(error){
      console.log(error.message);
    }
    this.idAlbum += 1
    return album;
  }

  removeAlbum(aAlbum){
    let album
    try{
        album = this.getAlbumById(aAlbum.id)
        const artist = this.getArtistById(aAlbum.idArtist)
        this.removeTracksFromPlayLists(album.tracks)
        artist.removeAlbum(aAlbum)
    }catch (e) {
        console.log(e.message)
    }


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
    let track
    try{
      track = this.getAlbumById(albumId).addTrack(this.idTrack,trackData);
    }catch(error){
      console.log(error.message);
      if(error instanceof TrackExistsInAlbumError) {
        console.log(error.name)
        console.log(error.message)
        console.log(error.trackName)
      }
            
    }
    this.idTrack += 1
    return track;
  }
  

  removeTrack(aTrack){
    let track
    try{
        track = this.getTrackById(aTrack.id)
        this.getAlbumById(track.idAlbum).removeTrack(track)
    }catch (error) {
        console.log(error.message)
    }
      this.removeTrackFromPlayList(track) // si no se capturó ningún error se debería por eliminar de la playlist

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

  getAlbums(){
    return this.artists.reduce((accumulator, artist) => {return accumulator.concat(artist.albums)}, [])
  }
  getAlbumById(id) {
    const albums = this.getAlbums()
    return this.getPorId(albums, id,new Error('No existes el album'));
  }

  getTracks(){
    return this.getAlbums().reduce((accumulator, album) => { return accumulator.concat(album.tracks)}, [])
  }
  getTrackById(id) {
    return this.getPorId(this.getTracks(), id, new Error('No existe el track'));
  }

  getPlaylistById(id) {
    return this.getPorId(this.playlists, id, new Error('No existe la playlist'));
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres:Array<String>) {
    return this.getTracks().filter(track => track.anyGenre(genres))
  }

  //retorna: los tracks de un genero en particular
  getTracksMatchingGenre(genre:String){
    return this.getTracks().filter(track => track.genres.includes(genre))
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



