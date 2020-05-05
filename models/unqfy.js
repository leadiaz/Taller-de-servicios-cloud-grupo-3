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
var albumException_1 = require("../Exceptions/albumException");
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
        this.playlists = new Array();
        // this.users = new Array()
    }
    UNQfy.prototype.getPorId = function (listaARecorrer, id, excepcion) {
        var elementEncontrado = listaARecorrer.find(function (element) { return element.id == id; });
        if (!elementEncontrado) {
            throw excepcion;
        }
        else {
            return elementEncontrado;
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
        this.artists.forEach(function (artist) {
            if (artist.name.includes(nombre)) {
                result.addArtist(artist);
            }
            artist.albums.forEach(function (album) {
                if (album.name.includes(nombre)) {
                    result.addAbum(album);
                }
            });
            artist.getTracks().forEach(function (track) {
                if (track.name.includes(nombre)) {
                    result.addTrack(track);
                }
            });
        });
        this.playlists.forEach(function (playList) { if (playList.name.includes(nombre)) {
            result.addPlaylist(playList);
        } });
        return result.toJSON();
    };
    UNQfy.prototype.agregarArtista = function (artistData) {
        if (this.artists.some(function (artist) { return artist.name === artistData.name; })) {
            throw new artistExcepcion_1.ArtistExistsWithThatName(artistData.name);
        }
        else {
            var artista = new artist_1.Artist();
            artista.id = this.idArtist;
            artista.name = artistData.name;
            artista.country = artistData.country;
            this.idArtist += 1;
            this.artists.push(artista);
            return artista;
        }
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
        var artista;
        try {
            artista = this.agregarArtista(artistData);
        }
        catch (error) {
            if (error instanceof artistExcepcion_1.ArtistExistsWithThatName) {
                console.log(error.message);
            }
        }
        return artista;
    };
    //Usuario
    UNQfy.prototype.addUser = function (name) {
        var user = new user_1.User();
        user.name = name;
        user.id = this.idUser;
        this.idUser += 1;
    };
    //Denota top3 de los tracks mas escuchados por un artista  
    UNQfy.prototype.top3TracksDeUnArtista = function (artist) {
        var top3 = new Array();
        var tracksEscuchadosDeArtista = this.tracksEscuchadosByUsers().filter(function (track) { return artist.getTracks().includes(track); });
        var jsonOrdenado = this.cantDeVecesQueSeRepite(tracksEscuchadosDeArtista);
        this.ordenarListaDeJson(jsonOrdenado);
        var n = 0;
        while (n !== 3 && jsonOrdenado.length > n) {
            top3.push(jsonOrdenado[n].track);
            n = n + 1;
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
        user_1.User.sinRepetidos(listaRepetidas).forEach(function (elem) {
            newList.push({ numero: elem, cant: _this.count(elem, listaRepetidas) });
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
        var artist;
        try {
            artist = this.getArtistById(aArtist);
            var tracks = artist.getTracks();
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
        var album;
        try {
            var artist = this.getArtistById(artistId);
            album = artist.addAlbum(this.idAlbum, albumData);
        }
        catch (error) {
            console.log(error.message);
        }
        this.idAlbum += 1;
        return album;
    };
    UNQfy.prototype.removeAlbum = function (aAlbum) {
        var album;
        try {
            album = this.getAlbumById(aAlbum);
            var artist = this.getArtistById(album.idArtist);
            this.removeTracksFromPlayLists(album.tracks);
            artist.removeAlbum(album);
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
        var track;
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
    UNQfy.prototype.removeTrack = function (idTrack) {
        var track;
        try {
            track = this.getTrackById(idTrack);
            this.getAlbumById(track.idAlbum).removeTrack(track);
            this.removeTrackFromPlayList(track);
        }
        catch (error) {
            console.log(error.message);
        }
        // si no se capturó ningún error se debería por eliminar de la playlist
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
    UNQfy.prototype.getAlbums = function () {
        return this.artists.reduce(function (accumulator, artist) { return accumulator.concat(artist.albums); }, []);
    };
    UNQfy.prototype.getAlbumById = function (id) {
        var albums = this.getAlbums();
        return this.getPorId(albums, id, new Error('No existes el album'));
    };
    UNQfy.prototype.getTracks = function () {
        return this.getAlbums().reduce(function (accumulator, album) { return accumulator.concat(album.tracks); }, []);
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
        return this.getTracks().filter(function (track) { return track.anyGenre(genres); });
    };
    //retorna: los tracks de un genero en particular
    UNQfy.prototype.getTracksMatchingGenre = function (genre) {
        return this.getTracks().filter(function (track) { return track.genres.includes(genre); });
    };
    // artistName: nombre de artista(string)
    // retorna: los tracks interpredatos por el artista con nombre artistName
    UNQfy.prototype.getTracksMatchingArtist = function (artistName) {
        var artist = this.artists.find(function (artist) { return artist.name === artistName; });
        if (!artist) {
            return [];
        }
        return artist.getTracks();
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
        var playlist = this.getPlayList(aPlayList);
        this.playlists.splice(this.playlists.indexOf(playlist), 1);
    };
    UNQfy.prototype.removePlayListById = function (id) {
        var playlist = this.getPlaylistById(id);
        this.playlists.splice(this.playlists.indexOf(playlist), 1);
    };
    UNQfy.prototype.getArtist = function (anArtist) {
        var artist = this.artists.find(function (artist) { return artist.name == anArtist; });
        if (!artist) {
            throw new artistExcepcion_1.ArtistExcepcion(anArtist);
        }
        else {
            return artist;
        }
    };
    UNQfy.prototype.getAlbum = function (anAlbum) {
        var album = this.getAlbums().find(function (album) { return album.name == anAlbum; });
        if (!album) {
            throw new albumException_1.NotExistAlbumError(anAlbum);
        }
        else {
            return album;
        }
    };
    UNQfy.prototype.getTrack = function (aTrack) {
        var track = this.getTracks().find(function (track) { return track.name == aTrack; });
        if (!track) {
            throw new trackExcepcion_1.TrackExcepcion(aTrack);
        }
        else {
            return track;
        }
    };
    UNQfy.prototype.getAlbumsFromArtist = function (idArtist) {
        var artist;
        try {
            artist = this.getArtistById(idArtist);
        }
        catch (error) {
            return error.message;
        }
        return artist.albums;
    };
    UNQfy.prototype.getTracksFromAlbum = function (idAlbum) {
        var album;
        try {
            album = this.getAlbumById(idAlbum);
        }
        catch (e) {
            return e.message;
        }
        return album.tracks;
    };
    UNQfy.prototype.getPlayList = function (aPlaylist) {
        return this.playlists.find(function (playlist) { return playlist.name == aPlaylist; });
    };
    UNQfy.prototype.evalMethod = function (metodo, argumentos) {
        switch (metodo) {
            case 'addArtist':
                console.log(this.addArtist({ name: argumentos[0], country: argumentos[1] }));
                break;
            case 'addAlbum':
                console.log(this.addAlbum(argumentos[0], { name: argumentos[1], year: argumentos[2] }));
                break;
            case 'addTrack':
                console.log(this.addTrack(argumentos[0], { name: argumentos[1], duration: argumentos[2], genres: argumentos[3] }));
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
                console.log(this.getAlbumsFromArtist(argumentos[0]));
                break;
            case 'getTracksFromAlbum':
                console.log(this.getTracksFromAlbum(argumentos[0]));
                break;
            case 'printArtist':
                try {
                    console.log(this.getArtist(argumentos[0]));
                }
                catch (e) {
                    console.log(e.message);
                }
                break;
            case 'printAlbum':
                try {
                    console.log(this.getAlbum(argumentos[0]));
                }
                catch (e) {
                    console.log(e.message);
                }
                break;
            case 'printTrack':
                try {
                    console.log(this.getTrack(argumentos[0]));
                }
                catch (e) {
                    console.log(e.message);
                }
                break;
            case 'getTracksMatchingArtist':
                console.log(this.getTracksMatchingArtist(argumentos[0]));
                break;
            case 'getTracksMatchingGenres':
                console.log(this.getTracksMatchingGenres(argumentos[0]));
                break;
            case 'createPlaylist':
                this.createPlaylist(argumentos[0], argumentos[1], argumentos[2]);
                break;
            case 'searchByName':
                console.log(this.searchByName(argumentos[0]));
                break;
            case 'getArtists':
                console.log(this.artists);
                break;
            default:
                console.log("no existe el metodo: ", metodo);
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
