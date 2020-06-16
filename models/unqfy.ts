import {Artist} from "./artist";
import {Album} from './album';
import {Track} from './track';
import {Playlist} from './playlist';
import {ArtistExcepcion, ArtistExistsWithThatName} from "../Exceptions/artistExcepcion";
import {TrackExcepcion, TrackExistsInAlbumError} from "../Exceptions/trackExcepcion"
import { SearchResult } from "./searchResult";
import { User } from "./user";
import {NotExistAlbumError, AlbumExistsInArtistError} from "../Exceptions/albumException";
import { NotExistPlayListError } from "../Exceptions/playListExcepcion";
import { NoExistUserError, ExistsUserError } from "../Exceptions/userExcepcion";
import {albumsArtistaPorName} from "./controller";
import{saveUNQfy} from "../main"


const app = require('./controller');

import picklify = require('picklify'); // para cargar/guarfar unqfy
import fs = require('fs'); // para cargar/guarfar unqfy


export class UNQfy {
    artists: Array<Artist>
    playlists: Array<Playlist>
    users: Array<User>

    private listeners: any[]


    constructor() {
        this.artists = new Array()
        this.playlists = new Array()
        this.users = new Array()
    }

    private getPorId(listaARecorrer, id, excepcion) {
        const elementEncontrado = listaARecorrer.find(element => element.id == id);
        if (!elementEncontrado) {
            throw excepcion;
        } else {
            return elementEncontrado;
        }
    }

    //Elimina el elemento dado de la array dada, si el elemento no se encuentra en la array, lanza una excepcion
    private removeElem(listaARecorrer, elemAEliminar, excepcion) {
        if (listaARecorrer.indexOf(elemAEliminar) >= 0) {
            listaARecorrer.splice(elemAEliminar, 1)
        } else {
            throw excepcion;
        }
    }

    searchByName(nombre: string) {
        const result: SearchResult = new SearchResult()
        this.artists.forEach((artist) => {
            if (artist.name.includes(nombre)) {
                result.addArtist(artist)
            }
        });
        this.getAlbums().forEach(album => {
            if (album.name.includes(nombre)) {
                result.addAbum(album)
            }
        });
        this.getTracks().forEach(track => {
            if (track.name.includes(nombre)) {
                result.addTrack(track)
            }
        });
        this.playlists.forEach((playList) => {
            if (playList.name.includes(nombre)) {
                result.addPlaylist(playList)
            }
        })
        return result.toJSON()
    }

    private agregarArtista(artistData) {
        if (this.artists.some(artist => {
            return artist.name == artistData.name
        })) {
            throw new ArtistExistsWithThatName(artistData.name)
        } else {
            const artista = new Artist(artistData.name, artistData.country);
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
        try {
            artista = this.agregarArtista(artistData)
        } catch (error) {
            if (error instanceof ArtistExistsWithThatName) {
                console.log(error.message)
            }
            throw error
            return;

        }
        return artista;
    }

    //Agrego un usuario a UNQFy, si user ya existe lanza una excepcion
    addUser(name) {
        if (this.users.some(user => {
            return user.name == name
        })) {
            throw new ExistsUserError(name);
        } else {
            const newUser = new User(name);
            this.users.push(newUser);
            return newUser;
        }
    }

    //El usuario con name_user escucha un name_track
    userListenTrack(name_user, name_track) {
        const user = this.getUser(name_user)
        const aTrack = this.getTrack(name_track)
        try {
            user.listenTrack(aTrack)
        } catch (e) {
            if (e instanceof NoExistUserError) {
                console.log(e.message)
            } else {
                if (e instanceof TrackExcepcion) {
                    console.log(e.message)
                } else {
                    throw e
                }
            }

        }
    }

    //Retorna los tracks escuchados por un usuario
    songsHeardByAnUser(name_user): Set<Track> {
        return this.getUser(name_user).songsHeard()
    }

    //Dado un id_User y id_Track retorna cuantas veces el usuario con id_user escucho el track con id_Track
    howManyTimesListenTrackByAnUser(name_user, name_Track) {
        return this.getUser(name_user).howManyTimesListenTrack(this.getTrack(name_Track))
    }

    //Retorna el User con esa id
    getUserById(id_user) {
        return this.getPorId(this.users, id_user, new Error('No existe el usuario con id ' + id_user))
    }


    //Elimina el user con ese id, sino se encuentra el user lanza un excepcion
    removeUser(id_User) {
        this.removeElem(this.users, this.getUserById(id_User), new Error('No existe el artista'))
    }

    //DUDAS EN LA IMPLEMENTACION, SIN TERMINAR EL TOP 3 DE TRACKS
    top3(list) {
        var n = 0
        const top3 = new Array()
        while (list.length > n) {
            top3.push(list[0].track)
        }
        return top3
    }

    //Retorna una array de Track que contiene solamente 3 tracks
    top3TracksDeUnArtista(artist: Artist) {
        const tracksEscuchadosDeArtista = this.tracksEscuchadosByUsers().filter(track => artist.getTracks().includes(track))
        const arrayDeObjOrdenada = this.cantDeVecesQueSeRepite(tracksEscuchadosDeArtista)
        this.ordernarArrayDeObj(arrayDeObjOrdenada)
        return arrayDeObjOrdenada.slice(0, 4)

    }

    //Ordena el array de objetos por el atributo "cant", ose a ordena de mayor a menor
    private ordernarArrayDeObj(lista) {
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

    //Denota una array de objetos, [{track: track , cant: 0}]
   private cantDeVecesQueSeRepite(listaDeRepetidos){
       var newList = new Array()
       new Set(listaDeRepetidos).forEach((elem) => { newList.push({track:elem,cant: this.count(elem,listaDeRepetidos)}) })
       return newList
    }

    //Denota los tracks escuchados por los usarios
    private tracksEscuchadosByUsers():Array<Track>{
      return this.users.reduce((accumulator, user) => {return accumulator.concat(user.tracks)}, [])
    }




    //Retorna la cantidad de veces que un elemento se repite en la Array dada
    private count(elem, list) {
        var count = 0;
        list.array.forEach(e => {
            if (e === elem) {
                count++;
            }
        });
        return count
    }

    //Elimino el artista con el idArtist dado,Elimino los tracks del artista de las playlist y albumes
    removeArtist(idArtist) {
        let artist;
        try {
            artist = this.getArtistById(idArtist);
            const tracks = artist.getTracks();
            artist.removeAlbums();
            this.removeTracksFromPlayLists(tracks);
            this.removeElem(this.artists, artist, new ArtistExcepcion());
        } catch (error) {
            console.log(error.message);
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
        const album = new Album(artistId, albumData.name, albumData.year);
        try {
            const artist = this.getArtistById(artistId);
            artist.addAlbum(album);
        } catch (error) {
            console.log(error.message);
            throw error
        }
        return album;
    }

    removeAlbum(idAlbum) {
        try {
            const album = this.getAlbumById(idAlbum)
            const artist = this.getArtistById(album.idArtist)
            this.removeTracksFromPlayLists(album.tracks)
            artist.removeAlbum(album)
        } catch (e) {
            console.log(e.message)
            throw e 
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
        
        const track = new Track();
        track.idAlbum = albumId
        track.name = trackData.name
        track.duration =  trackData.duration
        track.genres =  trackData.genres

        const album: Album = this.getAlbumById(albumId);
        album.addTrack(track)
        return track;
    }

    //Elimino el track con la id dado
    removeTrack(idTrack) {
        let track
        try {
            track = this.getTrackById(idTrack)
            this.getAlbumById(track.idAlbum).removeTrack(track) // ?
            this.removeTrackFromPlayList(track)
        } catch (error) {
            console.log(error.message)
        }

    }

    //Dado un Track lo elimino de las playlist en que aparezca
    private removeTrackFromPlayList(aTrack) {
        this.playlists.forEach((playlist) => {
            playlist.removeAtrack(aTrack)
        })
    }

    //Dado un array de tracks elimino los tracks de las playlists que aparezca
    private removeTracksFromPlayLists(tracksList) {
        tracksList.forEach((track) => {
            this.removeTrackFromPlayList(track)
        })
    }

    getArtistById(id) {
        try {
            return this.getPorId(this.artists, id, new ArtistExcepcion());
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    getAlbums() {
        return this.artists.reduce((accumulator, artist) => {
            return accumulator.concat(artist.albums)
        }, [])
    }

    getAlbumById(id) {
        const albums = this.getAlbums()
        return this.getPorId(albums, id, new NotExistAlbumError('id'));
    }

    //Retorna todos los tracks de unqfy
    getTracks() {
        return this.getAlbums().reduce((accumulator, album) => {
            return accumulator.concat(album.tracks)
        }, [])
    }

    getTrackById(id) {
        return this.getPorId(this.getTracks(), id, new TrackExcepcion());
    }

    getPlaylistById(id) {
        return this.getPorId(this.playlists, id, new NotExistPlayListError('No existe la playlist'));
    }

    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    getTracksMatchingGenres(genres: Array<String>) {
        return this.getTracks().filter(track => track.anyGenre(genres))
    }

    //retorna: los tracks de un genero en particular
    getTracksMatchingGenre(genre: String) {
        return this.getTracks().filter(track => track.genres.includes(genre))
    }

    // artistName: nombre de artista(string)
    // retorna: los tracks interpredatos por el artista con nombre artistName
    getTracksMatchingArtist(artistName) {
        let artist = this.artists.find(artist => artist.name === artistName)
        if (!artist) {
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
        const playlist = new Playlist(name)
        const tracks = this.getTracksMatchingGenres(genresToInclude)
        playlist.addTracks(tracks, maxDuration)
        this.playlists.push(playlist)
        return playlist;

    }

    //Dado un idPlaylist elimina la Playlist con ese id
    removePlayListById(idPlaylist) {
        const playlist = this.getPlaylistById(idPlaylist)
        this.playlists.splice(this.playlists.indexOf(playlist), 1)
    }

    //Retorna el artista con el name dado, sino lo encuentra lanza una excepcion
    getArtist(anArtist) {
        try {
            return this.getElem(anArtist, this.artists, new ArtistExcepcion())
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    //Retorna el album con el name dado, sino lo encuentra lanza una excepcion
    getAlbum(anAlbum) {
        try{
            return this.getElem(anAlbum, this.getAlbums(), new NotExistAlbumError(anAlbum))
        }catch(error){
            console.log(error.message)
        }
    }

    //Retorna el track con el name dado, sino lo encuentra lanza una excepcion
    getTrack(aTrack) {
        let track;
        try {
            return this.getElem(aTrack, this.getTracks(), new TrackExcepcion())
        } catch (error) {
            console.log(error.message);
        }

    }

    //Retorna el playlist con el name dado, sino lo encuentra lanza una excepcion
    getPlayList(aPlaylist) {
        try {
            return this.getElem(aPlaylist, this.playlists, new NotExistPlayListError(aPlaylist))
        } catch (error) {
            console.log(error.message)
        }

    }

    //Retorna el user con el name dado, sino lo encuentra lanza una excepcion
    getUser(aUser) {
        try {
            return this.getElem(aUser, this.users, new NoExistUserError(aUser))
        } catch (error) {
            console.log(error.message)
        }
    }

    //Retorna el elemento si es que se encuentra en la array, sino lanza una excepcion
    //Este metodo tendria que ser privado pero lo estoy probando en el test
    private getElem(nameElem, list, excepcion) {
        let elem = list.find(elemento => elemento.name == nameElem)
        if (!elem) {
            throw excepcion
        } else {
            return elem
        }
    }

    getAlbumsFromArtist(idArtist) {
        try {
            const artist = this.getArtistById(idArtist);
            return artist.albums;
        } catch (error) {
            console.log(error.message);
        }

    }

    getTracksFromAlbum(idAlbum) {
        try {
            const album = this.getAlbumById(idAlbum)
            return album.tracks
        } catch (e) {
            console.log( e.message)
        }
    }

    printArtist(artist_name) {
        console.log(this.getArtist(artist_name))
    }

    printAlbum(album_name) {
        console.log(this.getAlbum(album_name))
    }

    printTrack(track_name) {
        console.log(this.getTrack(track_name))
    }


//Posible funcion para no tener codigo repetido 
getElems(list,id,excepcion){
  let any
  try{
      any = this.getPorId(list,id,excepcion)
  }catch(e){
      if(e instanceof excepcion){
         e 
      }
      else{
        throw e
      }
  }
  return any
}
searchAlbums(anName){
  const albums =[] 
  this.getAlbums().forEach((album) => {
   if(album.name.toLowerCase().includes(anName.toLowerCase())){
     albums.push(album)
   }

  }
  )
  return albums
}



popularAlbumsForArtist(artistName) {
 const idArtist = this.getArtist(artistName).id
 const albumsName = []
 return   albumsArtistaPorName(artistName).then((albums) => {
   albums.forEach(album => {
     this.evalSiExist(albumsName, album, idArtist);
   });
   return albums
 })
}


    private evalSiExist(albumsName: any[], album: any, idArtist: any) {
        if (!albumsName.includes(album.name)) {
            albumsName.push(album.name);
            const _album = this.addAlbum(idArtist, { name: album.name, year: album.release_date });
        }
    }

getLyricsForTrack(trackName) {
  const track = this.getTrack(trackName)
  return track.getLyrics()
 }

    getArtists() {
        return this.artists;
    }

    getPlaylists() {
        return this.playlists;
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