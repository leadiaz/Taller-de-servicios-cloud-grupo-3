"use strict";
exports.__esModule = true;
var artist_1 = require("./artist");
var album_1 = require("./album");
var track_1 = require("./track");
var playlist_1 = require("./playlist");
var artistExcepcion_1 = require("../Exceptions/artistExcepcion");
var trackExcepcion_1 = require("../Exceptions/trackExcepcion");
var searchResult_1 = require("./searchResult");
var user_1 = require("./user");
var picklify = require('picklify'); // para cargar/guarfar unqfy
var fs = require('fs'); // para cargar/guarfar unqfy
var UNQfy = /** @class */ (function () {
    function UNQfy() {
        this.idArtist = 0;
        this.idAlbum = 0;
        this.idTrack = 0;
        this.idPlaylist = 0;
        this.idUser = 0;
        this.artists = new Array();
        this.albums = new Array();
        this.tracks = new Array();
        this.playlists = new Array();
        // this.users = new Array()
    }
    UNQfy.prototype.getPorId = function (listaARecorrer, id, excepcion) {
        var elementEncontrado = listaARecorrer.find(function (element) { return element.id === id; });
        if (!elementEncontrado) {
            throw excepcion;
        }
        else {
            return elementEncontrado;
        }
    };
    UNQfy.prototype.seachArtistByName = function (name) {
        var bool = this.artists.some(function (artist) { return artist.name === name; });
        if (bool) {
            throw new artistExcepcion_1.ArtistExistsWithThatName('Ya existe ese artirta', 'No se pudo agregra ese artista', name);
        }
    };
    //Error si el track ya existe en algun album de unqfy
    UNQfy.prototype.existTrackInAlbum = function (atrack) {
        var bool = this.albums.some(function (album) { return album.tracks.some(function (track) { return track.name === atrack; }); });
        if (bool) {
            throw new trackExcepcion_1.TrackExistsInAlbumError('TrackExistsInAlbumError', 'Ya existe el track en algun album', atrack);
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
        var result = new searchResult_1.SearchResult();
        this.artists.forEach(function (artist) { if (artist.name.includes(nombre)) {
            result.addArtist(artist);
        } });
        this.albums.forEach(function (album) { if (album.name.includes(nombre)) {
            result.addAbum(album);
        } });
        this.tracks.forEach(function (track) { if (track.name.includes(nombre)) {
            result.addTrack(track);
        } });
        this.playlists.forEach(function (playList) { if (playList.name.includes(nombre)) {
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
        var artista = new artist_1.Artist();
        artista.id = this.idArtist;
        artista.name = artistData.name;
        artista.country = artistData.country;
        this.idArtist += 1;
        this.artists.push(artista);
        return artista;
    };
    //Usuario
    UNQfy.prototype.addUser = function (name) {
        var user = new user_1.User();
        user.name = name;
        user.id = this.idUser;
        this.idUser += 1;
    };
    //MEJORAR 
    UNQfy.prototype.top3TracksDeUnArtista = function (artist) {
        var top3 = new Array();
        var tracksEscuchadosPorUsuarios = this.tracksEscuchadosByUsers();
        var tracksEscuchadosDeArtista = tracksEscuchadosPorUsuarios.filter(function (track) { return artist.getTracks().includes(track); });
        var jsonOrdenado = this.cantDeVecesQueSeRepite(tracksEscuchadosDeArtista);
        this.ordenarListaDeJson(jsonOrdenado);
        var n = 0;
        while (n !== 3 && jsonOrdenado.length > 0) {
            top3.push(jsonOrdenado[n]);
            n = n - 1;
        }
        return top3;
    };
    UNQfy.prototype.ordenarListaDeJson = function (lista) {
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
    };
    //Denota una array de json, [{track: track , cant: 0}]
    UNQfy.prototype.cantDeVecesQueSeRepite = function (listaRepetidas) {
        var _this = this;
        var newList = [];
        this.sinRepetidos(listaRepetidas).forEach(function (elem) {
            newList.push({ numero: elem, cant: _this.count(elem, listaRepetidas) });
        });
        return newList;
    };
    UNQfy.prototype.sinRepetidos = function (list) {
        var newList = [];
        list.forEach(function (elem) {
            if (!newList.includes(elem)) {
                newList.push(elem);
            }
        });
        return newList;
    };
    UNQfy.prototype.tracksEscuchadosByUsers = function () {
        return this.users.reduce(function (accumulator, user) { return accumulator.concat(user.tracks); }, []);
    };
    UNQfy.prototype.count = function (elem, list) {
        var count = 0;
        for (var i = 0; i < list.length; ++i) {
            if (list[i] === elem)
                count++;
        }
        return count;
    };
    //remove artist
    UNQfy.prototype.removeArtist = function (aArtist) {
        this.removeElem(this.artists, aArtist, new Error('No existe el artista'));
    };
    //Elimino por id
    UNQfy.prototype.removeArtistById = function (id) {
        var artist = this.getArtistById(id);
        var tracksFromArtist = this.tracksFromAlbumes(artist.albums);
        this.artists.splice(this.artists.indexOf(artist), 1);
        this.removeTracksFromPlayLists(tracksFromArtist);
    };
    //Denoto todos los tracks de los albumes
    UNQfy.prototype.tracksFromAlbumes = function (albumes) {
        var tracks = new Array();
        albumes.forEach(function (album) {
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
        var album = new album_1.Album();
        album.id = this.idAlbum;
        album.name = albumData.name;
        album.year = albumData.year;
        try {
            this.getArtistById(artistId).addAlbum(album);
        }
        catch (error) {
            console.log(error.message);
        }
        this.idAlbum += 1;
        this.albums.push(album);
        return album;
    };
    UNQfy.prototype.removeAlbum = function (aAlbum) {
        this.removeElem(this.albums, aAlbum, new Error('No existe el Album'));
    };
    UNQfy.prototype.removeAlbumById = function (id) {
        var album = this.getAlbumById(id);
        var tracksFromAlbum = album.tracks;
        this.albums.splice(this.albums.indexOf(album), 1);
        this.removeTracksFromPlayLists(tracksFromAlbum);
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
        var track = new track_1.Track();
        track.id = this.idTrack;
        track.name = trackData.name;
        track.duration = trackData.duration;
        track.genres = trackData.genres;
        try {
            this.getAlbumById(albumId).addTrack(track);
            this.existTrackInAlbum(trackData.name);
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
        this.tracks.push(track);
        return track;
    };
    UNQfy.prototype.removeTrack = function (aTrack) {
        this.removeElem(this.tracks, aTrack, new Error('No existe el Track'));
    };
    //Elimino por id
    UNQfy.prototype.removeTrackById = function (id) {
        var track = this.getTrackById(id);
        this.tracks.splice(this.tracks.indexOf(track), 1);
        this.removeTrackFromPlayList(track);
    };
    //Elimina un track de todas las playList
    UNQfy.prototype.removeTrackFromPlayList = function (aTrack) {
        this.playlists.forEach(function (playlist) {
            playlist.removeAtrack(aTrack);
        });
    };
    //Elimina los tracks de las playlists
    UNQfy.prototype.removeTracksFromPlayLists = function (tracksList) {
        this.playlists.forEach(function (playlist) {
            tracksList.forEach(function (track) {
                playlist.removeAtrack(track);
            });
        });
    };
    UNQfy.prototype.getArtistById = function (id) {
        return this.getPorId(this.artists, id, new Error('No existe el artista'));
    };
    UNQfy.prototype.getAlbumById = function (id) {
        return this.getPorId(this.albums, id, new Error('No existes el album'));
    };
    UNQfy.prototype.getTrackById = function (id) {
        return this.getPorId(this.tracks, id, new Error('No existe el track'));
    };
    UNQfy.prototype.getPlaylistById = function (id) {
        return this.getPorId(this.playlists, id, new Error('No existe la playlist'));
    };
    // genres: array de generos(strings)
    // retorna: los tracks que contenga alguno de los generos en el parametro genres
    UNQfy.prototype.getTracksMatchingGenres = function (genres) {
        return this.tracks.filter(function (track) { return track.anyGenre(genres); });
    };
    //retorna: los tracks de un genero en particular
    UNQfy.prototype.getTracksMatchingGenre = function (genre) {
        return this.tracks.filter(function (track) { return track.genres.includes(genre); });
    };
    // artistName: nombre de artista(string)
    // retorna: los tracks interpredatos por el artista con nombre artistName
    UNQfy.prototype.getTracksMatchingArtist = function (artistName) {
        return this.artists.find(function (artist) { return artist.name === artistName; }).getTracks();
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
        var playlist = new playlist_1.Playlist();
        var tracks = this.getTracksMatchingGenres(genresToInclude);
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
        var playlist = this.getPlaylistById(id);
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
                console.log("no existe el metodo: ", typeof metodo);
        }
    };
    UNQfy.prototype.save = function (filename) {
        var listenersBkp = this.listeners;
        this.listeners = [];
        var serializedData = picklify.picklify(this);
        this.listeners = listenersBkp;
        fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
    };
    UNQfy.load = function (filename) {
        var serializedData = fs.readFileSync(filename, { encoding: 'utf-8' });
        //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
        var classes = [UNQfy, artist_1.Artist, album_1.Album, track_1.Track, playlist_1.Playlist];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    };
    return UNQfy;
}());
exports.UNQfy = UNQfy;
// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
