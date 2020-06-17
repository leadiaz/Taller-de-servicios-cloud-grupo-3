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
var playListExcepcion_1 = require("../Exceptions/playListExcepcion");
var userExcepcion_1 = require("../Exceptions/userExcepcion");
var controller_1 = require("./controller");
var app = require('./controller');
var picklify = require("picklify"); // para cargar/guarfar unqfy
var fs = require("fs"); // para cargar/guarfar unqfy
var UNQfy = /** @class */ (function () {
    function UNQfy() {
        this.artists = new Array();
        this.playlists = new Array();
        this.users = new Array();
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
    //Elimina el elemento dado de la array dada, si el elemento no se encuentra en la array, lanza una excepcion
    UNQfy.prototype.removeElem = function (listaARecorrer, elemAEliminar, excepcion) {
        var index = listaARecorrer.indexOf(elemAEliminar);
        if (index >= 0) {
            listaARecorrer.splice(index, 1);
        }
        else {
            throw excepcion;
        }
    };
    UNQfy.prototype.searchByName = function (nombre) {
        var result = new searchResult_1.SearchResult();
        this.artists.forEach(function (artist) {
            if (artist.name.toLowerCase().includes(nombre.toLowerCase())) {
                result.addArtist(artist);
            }
        });
        this.getAlbums().forEach(function (album) {
            if (album.name.toLowerCase().includes(nombre.toLowerCase())) {
                result.addAbum(album);
            }
        });
        this.getTracks().forEach(function (track) {
            if (track.name.toLowerCase().includes(nombre.toLowerCase())) {
                result.addTrack(track);
            }
        });
        this.playlists.forEach(function (playList) {
            if (playList.name.toLowerCase().includes(nombre.toLowerCase())) {
                result.addPlaylist(playList);
            }
        });
        return result.toJSON();
    };
    UNQfy.prototype.agregarArtista = function (artistData) {
        if (this.artists.some(function (artist) {
            return artist.name == artistData.name;
        })) {
            throw new artistExcepcion_1.ArtistExistsWithThatName(artistData.name);
        }
        else {
            var artista = new artist_1.Artist(artistData.name, artistData.country);
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
            throw error;
            return;
        }
        return artista;
    };
    //Agrego un usuario a UNQFy, si user ya existe lanza una excepcion
    UNQfy.prototype.addUser = function (name) {
        if (this.users.some(function (user) {
            return user.name == name;
        })) {
            throw new userExcepcion_1.ExistsUserError(name);
        }
        else {
            var newUser = new user_1.User(name);
            this.users.push(newUser);
            return newUser;
        }
    };
    //El usuario con name_user escucha un name_track
    UNQfy.prototype.userListenTrack = function (name_user, name_track) {
        var user = this.getUser(name_user);
        var aTrack = this.getTrack(name_track);
        try {
            user.listenTrack(aTrack);
        }
        catch (e) {
            if (e instanceof userExcepcion_1.NoExistUserError) {
                console.log(e.message);
            }
            else {
                if (e instanceof trackExcepcion_1.TrackExcepcion) {
                    console.log(e.message);
                }
                else {
                    throw e;
                }
            }
        }
    };
    //Retorna los tracks escuchados por un usuario
    UNQfy.prototype.songsHeardByAnUser = function (name_user) {
        return this.getUser(name_user).songsHeard();
    };
    //Dado un id_User y id_Track retorna cuantas veces el usuario con id_user escucho el track con id_Track
    UNQfy.prototype.howManyTimesListenTrackByAnUser = function (name_user, name_Track) {
        return this.getUser(name_user).howManyTimesListenTrack(this.getTrack(name_Track));
    };
    //Retorna el User con esa id
    UNQfy.prototype.getUserById = function (id_user) {
        return this.getPorId(this.users, id_user, new Error('No existe el usuario con id ' + id_user));
    };
    //Elimina el user con ese id, sino se encuentra el user lanza un excepcion
    UNQfy.prototype.removeUser = function (id_User) {
        this.removeElem(this.users, this.getUserById(id_User), new Error('No existe el artista'));
    };
    //DUDAS EN LA IMPLEMENTACION, SIN TERMINAR EL TOP 3 DE TRACKS
    UNQfy.prototype.top3 = function (list) {
        var n = 0;
        var top3 = new Array();
        while (list.length > n) {
            top3.push(list[0].track);
        }
        return top3;
    };
    //Retorna una array de Track que contiene solamente 3 tracks
    UNQfy.prototype.top3TracksDeUnArtista = function (artist) {
        var tracksEscuchadosDeArtista = this.tracksEscuchadosByUsers().filter(function (track) { return artist.getTracks().includes(track); });
        var arrayDeObjOrdenada = this.cantDeVecesQueSeRepite(tracksEscuchadosDeArtista);
        this.ordernarArrayDeObj(arrayDeObjOrdenada);
        return arrayDeObjOrdenada.slice(0, 4);
    };
    //Ordena el array de objetos por el atributo "cant", ose a ordena de mayor a menor
    UNQfy.prototype.ordernarArrayDeObj = function (lista) {
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
    //Denota una array de objetos, [{track: track , cant: 0}]
    UNQfy.prototype.cantDeVecesQueSeRepite = function (listaDeRepetidos) {
        var _this = this;
        var newList = new Array();
        new Set(listaDeRepetidos).forEach(function (elem) { newList.push({ track: elem, cant: _this.count(elem, listaDeRepetidos) }); });
        return newList;
    };
    //Denota los tracks escuchados por los usarios
    UNQfy.prototype.tracksEscuchadosByUsers = function () {
        return this.users.reduce(function (accumulator, user) { return accumulator.concat(user.tracks); }, []);
    };
    //Retorna la cantidad de veces que un elemento se repite en la Array dada
    UNQfy.prototype.count = function (elem, list) {
        var count = 0;
        list.array.forEach(function (e) {
            if (e === elem) {
                count++;
            }
        });
        return count;
    };
    //Elimino el artista con el idArtist dado,Elimino los tracks del artista de las playlist y albumes
    UNQfy.prototype.removeArtist = function (idArtist) {
        var artist;
        try {
            artist = this.getArtistById(idArtist);
            var tracks = artist.getTracks();
            artist.removeAlbums();
            this.removeTracksFromPlayLists(tracks);
            this.removeElem(this.artists, artist, new artistExcepcion_1.ArtistExcepcion());
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
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
        var album = new album_1.Album(artistId, albumData.name, albumData.year);
        try {
            var artist = this.getArtistById(artistId);
            artist.addAlbum(album);
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
        return album;
    };
    UNQfy.prototype.removeAlbum = function (idAlbum) {
        try {
            var album = this.getAlbumById(idAlbum);
            var artist = this.getArtistById(album.idArtist);
            this.removeTracksFromPlayLists(album.tracks);
            artist.removeAlbum(album);
        }
        catch (e) {
            console.log(e.message);
            throw e;
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
        var track = new track_1.Track();
        track.idAlbum = albumId;
        track.name = trackData.name;
        track.duration = trackData.duration;
        track.genres = trackData.genres;
        var album = this.getAlbumById(albumId);
        album.addTrack(track);
        return track;
    };
    //Elimino el track con la id dado
    UNQfy.prototype.removeTrack = function (idTrack) {
        var track;
        try {
            track = this.getTrackById(idTrack);
            this.getAlbumById(track.idAlbum).removeTrack(track); // ?
            this.removeTrackFromPlayList(track);
        }
        catch (error) {
            console.log(error.message);
        }
    };
    //Dado un Track lo elimino de las playlist en que aparezca
    UNQfy.prototype.removeTrackFromPlayList = function (aTrack) {
        this.playlists.forEach(function (playlist) {
            playlist.removeAtrack(aTrack);
        });
    };
    //Dado un array de tracks elimino los tracks de las playlists que aparezca
    UNQfy.prototype.removeTracksFromPlayLists = function (tracksList) {
        var _this = this;
        tracksList.forEach(function (track) {
            _this.removeTrackFromPlayList(track);
        });
    };
    UNQfy.prototype.getArtistById = function (id) {
        try {
            return this.getPorId(this.artists, id, new artistExcepcion_1.ArtistExcepcion());
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    };
    UNQfy.prototype.getAlbums = function () {
        return this.artists.reduce(function (accumulator, artist) {
            return accumulator.concat(artist.albums);
        }, []);
    };
    UNQfy.prototype.getAlbumById = function (id) {
        var albums = this.getAlbums();
        return this.getPorId(albums, id, new albumException_1.NotExistAlbumError('id'));
    };
    //Retorna todos los tracks de unqfy
    UNQfy.prototype.getTracks = function () {
        return this.getAlbums().reduce(function (accumulator, album) {
            return accumulator.concat(album.tracks);
        }, []);
    };
    UNQfy.prototype.getTrackById = function (id) {
        return this.getPorId(this.getTracks(), id, new trackExcepcion_1.TrackExcepcion());
    };
    UNQfy.prototype.getPlaylistById = function (id) {
        return this.getPorId(this.playlists, id, new playListExcepcion_1.NotExistPlayListError('No existe la playlist'));
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
        var playlist = new playlist_1.Playlist(name);
        var tracks = this.getTracksMatchingGenres(genresToInclude);
        playlist.addTracks(tracks, maxDuration);
        this.playlists.push(playlist);
        return playlist;
    };
    //Dado un idPlaylist elimina la Playlist con ese id
    UNQfy.prototype.removePlayListById = function (idPlaylist) {
        var playlist = this.getPlaylistById(idPlaylist);
        this.playlists.splice(this.playlists.indexOf(playlist), 1);
    };
    //Retorna el artista con el name dado, sino lo encuentra lanza una excepcion
    UNQfy.prototype.getArtist = function (anArtist) {
        try {
            return this.getElem(anArtist, this.artists, new artistExcepcion_1.ArtistExcepcion());
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    };
    //Retorna el album con el name dado, sino lo encuentra lanza una excepcion
    UNQfy.prototype.getAlbum = function (anAlbum) {
        try {
            return this.getElem(anAlbum, this.getAlbums(), new albumException_1.NotExistAlbumError(anAlbum));
        }
        catch (error) {
            console.log(error.message);
        }
    };
    //Retorna el track con el name dado, sino lo encuentra lanza una excepcion
    UNQfy.prototype.getTrack = function (aTrack) {
        var track;
        try {
            return this.getElem(aTrack, this.getTracks(), new trackExcepcion_1.TrackExcepcion());
        }
        catch (error) {
            console.log(error.message);
        }
    };
    //Retorna el playlist con el name dado, sino lo encuentra lanza una excepcion
    UNQfy.prototype.getPlayList = function (aPlaylist) {
        try {
            return this.getElem(aPlaylist, this.playlists, new playListExcepcion_1.NotExistPlayListError(aPlaylist));
        }
        catch (error) {
            console.log(error.message);
        }
    };
    //Retorna el user con el name dado, sino lo encuentra lanza una excepcion
    UNQfy.prototype.getUser = function (aUser) {
        try {
            return this.getElem(aUser, this.users, new userExcepcion_1.NoExistUserError(aUser));
        }
        catch (error) {
            console.log(error.message);
        }
    };
    //Retorna el elemento si es que se encuentra en la array, sino lanza una excepcion
    //Este metodo tendria que ser privado pero lo estoy probando en el test
    UNQfy.prototype.getElem = function (nameElem, list, excepcion) {
        var elem = list.find(function (elemento) { return elemento.name == nameElem; });
        if (!elem) {
            throw excepcion;
        }
        else {
            return elem;
        }
    };
    UNQfy.prototype.getAlbumsFromArtist = function (idArtist) {
        try {
            var artist = this.getArtistById(idArtist);
            return artist.albums;
        }
        catch (error) {
            console.log(error.message);
        }
    };
    UNQfy.prototype.getTracksFromAlbum = function (idAlbum) {
        try {
            var album = this.getAlbumById(idAlbum);
            return album.tracks;
        }
        catch (e) {
            console.log(e.message);
        }
    };
    UNQfy.prototype.printArtist = function (artist_name) {
        console.log(this.getArtist(artist_name));
    };
    UNQfy.prototype.printAlbum = function (album_name) {
        console.log(this.getAlbum(album_name));
    };
    UNQfy.prototype.printTrack = function (track_name) {
        console.log(this.getTrack(track_name));
    };
    //Posible funcion para no tener codigo repetido 
    UNQfy.prototype.getElems = function (list, id, excepcion) {
        var any;
        try {
            any = this.getPorId(list, id, excepcion);
        }
        catch (e) {
            if (e instanceof excepcion) {
                e;
            }
            else {
                throw e;
            }
        }
        return any;
    };
    UNQfy.prototype.searchAlbums = function (anName) {
        var albums = [];
        this.getAlbums().forEach(function (album) {
            if (album.name.toLowerCase().includes(anName.toLowerCase())) {
                albums.push(album);
            }
        });
        return albums;
    };
    UNQfy.prototype.popularAlbumsForArtist = function (artistName) {
        var _this = this;
        var idArtist = this.getArtist(artistName).id;
        var albumsName = [];
        return controller_1.albumsArtistaPorName(artistName).then(function (albums) {
            albums.forEach(function (album) {
                _this.evalSiExist(albumsName, album, idArtist);
            });
            return albums;
        });
    };
    UNQfy.prototype.evalSiExist = function (albumsName, album, idArtist) {
        if (!albumsName.includes(album.name)) {
            albumsName.push(album.name);
            var _album = this.addAlbum(idArtist, { name: album.name, year: album.release_date });
        }
    };
    UNQfy.prototype.getLyricsForTrack = function (trackName) {
        var track = this.getTrack(trackName);
        return track.getLyrics();
    };
    UNQfy.prototype.getArtists = function () {
        return this.artists;
    };
    UNQfy.prototype.getPlaylists = function () {
        return this.playlists;
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
        var classes = [UNQfy, artist_1.Artist, album_1.Album, track_1.Track, playlist_1.Playlist, user_1.User];
        return picklify.unpicklify(JSON.parse(serializedData), classes);
    };
    return UNQfy;
}());
exports.UNQfy = UNQfy;
// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
