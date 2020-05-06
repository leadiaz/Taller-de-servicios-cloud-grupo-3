import {Artist} from "./artist"
import {Album} from './album'
import {Track} from './track'
import {Playlist} from './playlist'
import {ArtistExcepcion, ArtistExistsWithThatName} from "../Exceptions/artistExcepcion";
import {TrackExcepcion, TrackExistsInAlbumError} from "../Exceptions/trackExcepcion"
import { SearchResult } from "./searchResult";
import { User } from "./user";
import {NotExistAlbumError} from "../Exceptions/albumException";
import { NotExistPlayListError } from "../Exceptions/playListExcepcion";




const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy

export class UNQfy {
  artists: Array<Artist>
  playlists: Array<Playlist>
  users:Array<User>

  private listeners: any[]


  constructor(){
    this.artists = new Array()
    this.playlists = new Array()
    this.users = new Array()
  }

  private getPorId(listaARecorrer, id, excepcion){
    const elementEncontrado = listaARecorrer.find(element => element.id == id);
    if(!elementEncontrado){
      throw excepcion;
    }else{
      return elementEncontrado;
    }
  }
  //Elimina el elemento dado de la array dada, si el elemento no se encuentra en la array, lanza una excepcion
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

  private agregarArtista(artistData){
    if(this.artists.some(artist => {return artist.name === artistData.name})){
      throw new ArtistExistsWithThatName(artistData.name)
    }else{
      const artista = new Artist();
      artista.name = artistData.name;
      artista.country = artistData.country;
      this.artists.push(artista)
      return artista
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
    let artista
    try{
      artista = this.agregarArtista(artistData)
    }
    catch(error){
      if(error instanceof ArtistExistsWithThatName){
          console.log(error.message)
      }
    }
    return artista
  }

  //Agrego un usuario a UNQFy
  addUser(name){
    const newUser = new User()
    newUser.name = name
    this.users.push(newUser)
    return newUser
  }

    //Retorna una array de Track que contiene solamente 3 tracks 
    top3TracksDeUnArtista(artist:Artist) {
      const tracksEscuchadosDeArtista = this.tracksEscuchadosByUsers().filter(track => artist.getTracks().includes(track))
      const arrayDeObjOrdenada = this.cantDeVecesQueSeRepite(tracksEscuchadosDeArtista)
      this.ordernarArrayDeObj(arrayDeObjOrdenada)
      return arrayDeObjOrdenada.slice(0,4)

    }

     //Ordena el array de objetos por el atributo "cant", ose a ordena de mayor a menor
     private ordernarArrayDeObj(lista){
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
    

    //Retorna una array de objetos, [{track: track , cant: 0}]
   private cantDeVecesQueSeRepite(listaDeRepetidos){
       var newList = new Array()
       new Set(listaDeRepetidos).forEach((elem) => { newList.push({track:elem,cant: this.count(elem,listaDeRepetidos)}) })
       return newList
    }

    //Retorna los tracks escuchados por los usarios
    private tracksEscuchadosByUsers():Array<Track>{
      return this.users.reduce((accumulator, user) => {return accumulator.concat(user.tracks)}, [])
    }


  //Retorna la cantidad de veces que un elemento se repite en la Array dada
  private count(elem,list){
    var count = 0;
    list.array.forEach(e => { if(e === elem) {count++;} });
    return count
  }

  //Elimino el artista con el idArtist dado,Elimino los tracks del artista de las playlist y albumes 
  removeArtist(idArtist){
    let artist
    try{
      artist = this.getArtistById(idArtist)
      const tracks = artist.getTracks()
      artist.removeAlbums()
      this.removeTracksFromPlayLists(tracks)
      this.removeElem(this.artists,artist,new Error('No existe el artista'))
    }catch(error){
      console.log(error.message)
    }
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
      album = artist.addAlbum(albumData)
    }catch(error){
      console.log(error.message);
    }
    return album;
  }

  removeAlbum(idAlbum){
    let album
    try{
      album = this.getAlbumById(idAlbum)
      const artist = this.getArtistById(album.idArtist)
      this.removeTracksFromPlayLists(album.tracks)
      artist.removeAlbum(album)
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
      track = this.getAlbumById(albumId).addTrack(trackData);
    }catch(error){
      console.log(error.message);
      if(error instanceof TrackExistsInAlbumError) {
        console.log(error.name)
        console.log(error.message)
        console.log(error.trackName)
      }

    }
    return track;
  }

  //Elimino el track con la id dado
  removeTrack(idTrack){
    let track
    try{
      track = this.getTrackById(idTrack)
      this.getAlbumById(track.idAlbum).removeTrack(track)
      this.removeTrackFromPlayList(track)
    }catch (error) {
      console.log(error.message)
    }
     // si no se capturó ningún error se debería por eliminar de la playlist

  }

  //Dado un Track lo elimino de las playlist en que aparezca 
  private removeTrackFromPlayList(aTrack){
    this.playlists.forEach((playlist)=>{
      playlist.removeAtrack(aTrack)
    })
  }


 //Dado un array de tracks elimino los tracks de las playlists que aparezca
  private removeTracksFromPlayLists(tracksList){
    tracksList.forEach((track)=>{ this.removeTrackFromPlayList(track) })
  }
    // this.playlists.forEach((playlist) =>{
    //   tracksList.forEach(track => {
    //     playlist.removeAtrack(track)
    //   });
    // })

  


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
    let artist = this.artists.find(artist => artist.name === artistName)
    if(!artist){
      return []
    }
    return artist.getTracks()
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
    playlist.name = name


    playlist.addTracks(tracks, maxDuration)
    this.playlists.push(playlist)
    return playlist;

  }


 
  //Dado un idPlaylist elimina la Playlist con ese id
  removePlayListById(idPlaylist){
    const playlist = this.getPlaylistById(idPlaylist)
    this.playlists.splice(this.playlists.indexOf(playlist),1)
  }
  
  //Retorna el artista con el name dado, sino lo encuentra lanza una excepcion
  getArtist(anArtist){
    return this.getElem(anArtist,this.artists,new ArtistExcepcion(anArtist))
  }
  //Retorna el album con el name dado, sino lo encuentra lanza una excepcion
  getAlbum(anAlbum){
    return this.getElem(anAlbum,this.getAlbums(), new NotExistAlbumError(anAlbum))
  }
  //Retorna el track con el name dado, sino lo encuentra lanza una excepcion
  getTrack(aTrack){
    return this.getElem(aTrack,this.getTracks(),new TrackExcepcion(aTrack))
  }
  //Retorna el playlist con el name dado, sino lo encuentra lanza una excepcion
  getPlayList(aPlaylist){
    return this.getElem(aPlaylist,this.playlists,new NotExistPlayListError(aPlaylist))
  }
  
  //Retorna el elemento si es que se encuentra en la array, sino lanza una excepcion
  //Este metodo tendria que ser privado pero lo estoy probando en el test
   getElem(nameElem,list,excepcion){
    let elem = list.find(elemento => elemento.name == nameElem)
    if(!elem){
      excepcion
    }
    else{
      return elem
    }
  }

  getAlbumsFromArtist(idArtist){
    let artist
    try{
      artist = this.getArtistById(idArtist)
    }catch (error) {
      return error.message
    }
    return artist.albums
  }
  getTracksFromAlbum(idAlbum){
    let album
    try{
      album= this.getAlbumById(idAlbum)
    }catch (e) {
      return e.message
    }
    return album.tracks
  }

  evalMethod(metodo:string, argumentos:Array<any>){
    switch (metodo) {
      case 'addArtist':
        console.log(this.addArtist({name: argumentos[0], country: argumentos[1]}));
        break;
      case  'addAlbum':
        console.log(this.addAlbum(argumentos[0], {name: argumentos[1], year: eval(argumentos[2])}));
        break;
      case 'addTrack':
        console.log(this.addTrack(argumentos[0],{name: argumentos[1], duration: eval(argumentos[2]), genres: eval(argumentos[3])}));
        break;
      case 'removeArtist':
        this.removeArtist(argumentos[0]);
        break;
      case 'removeAlbum':
        this.removeAlbum(argumentos[0]);
        break;
      case 'removeTrack':
        this.removeTrack(argumentos[0]);
        break;
      case 'getAlbumsFromArtist':
        console.log(this.getAlbumsFromArtist(argumentos[0]))
        break;
      case 'getTracksFromAlbum':
        console.log(this.getTracksFromAlbum(argumentos[0]))
        break
      case 'printArtist':
        try{
          console.log(this.getArtist(argumentos[0]))
        }catch (e) {
          console.log(e.message)
        }

        break;
      case 'printAlbum':
        try{
          console.log(this.getAlbum(argumentos[0]))
        }catch (e) {
          console.log(e.message)
        }
        break;
      case 'printTrack':
        try{
          console.log(this.getTrack(argumentos[0]))
        }catch (e) {
          console.log(e.message)
        }
        break;
      case 'getTracksMatchingArtist':
        console.log(this.getTracksMatchingArtist(argumentos[0]));
        break;
      case 'getTracksMatchingGenres':
        console.log(this.getTracksMatchingGenres(eval(argumentos[0])));
        break;
      case 'createPlaylist':
        this.createPlaylist(argumentos[0], eval(argumentos[1]), eval(argumentos[2]));
        break;
      case 'searchByName':
        console.log(this.searchByName(argumentos[0]));
        break;
      case 'getArtists':
        console.log(this.artists)
        break
      case 'getPlaylists':
        console.log(this.playlists)
        break
      default :
        console.log("no existe el metodo: ", metodo)
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
    const classes = [UNQfy, Artist, Album, Track, Playlist,User];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente



