"use strict";
exports.__esModule = true;
var fs = require('fs'); // necesitado para guardar/cargar unqfy
var unqmod = require('./models/unqfy'); // importamos el modulo unqfy
// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename) {
    if (filename === void 0) { filename = 'data.json'; }
    var unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}
function saveUNQfy(unqfy, filename) {
    if (filename === void 0) { filename = 'data.json'; }
    unqfy.save(filename);
}
exports.saveUNQfy = saveUNQfy;
/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/
function main() {
    // console.log('arguments: ');
    var unqfy = getUNQfy();
    var method = process.argv.length > 2 ? process.argv[2] : '';
    var argumetos = new Array();
    for (var i = 3; i < process.argv.length; i++) {
        argumetos.push(process.argv[i]);
    }
    evalMethod(method, argumetos,unqfy);
    saveUNQfy(unqfy)
}

function setUp(unqfy){
   unqfy.addArtist({name:'David bowie',country:'Usa'})
   unqfy.addAlbum(1,{name:'Album 1',year:2000})
   unqfy.addTrack(2,{name:'Stuck With U (with Justin Bieber)',duration:10,genres:['pop']})
}

function evalMethod(metodo, argumentos,unqfy){
    switch (metodo) {
      case 'populateAlbumsForArtist': 
        unqfy.popularAlbumsForArtist(argumentos[0]).then((albums) => 
        saveUNQfy(unqfy)
        );
         break;
      case 'getLyricsForTrack':
        unqfy.getLyricsForTrack(argumentos[0]).then((string)=> {
         console.log(string),
         saveUNQfy(unqfy)
        }
         );
         break;   
      case 'setUp':
          setUp(unqfy)
          break;   
      case 'addArtist':
        console.log(unqfy.addArtist({name: argumentos[0], country: argumentos[1]}));
        break;
      case  'addAlbum':
        console.log(unqfy.addAlbum(argumentos[0], {name: argumentos[1], year: eval(argumentos[2])}));
        break;
      case 'addTrack':
        console.log(unqfy.addTrack(argumentos[0],{name: argumentos[1], duration: eval(argumentos[2]), genres: eval(argumentos[3])}));
        break;
      case 'addUser':
        console.log(unqfy.addUser(argumentos[0]))
        break;  
      case 'removeArtist':
        unqfy.removeArtist(argumentos[0]);
        break;
      case 'removeAlbum':
        unqfy.removeAlbum(argumentos[0]);
        break;
      case 'removeTrack':
        unqfy.removeTrack(argumentos[0]);
        break;
      case 'getAlbumsFromArtist':
        console.log(unqfy.getAlbumsFromArtist(argumentos[0]))
        break;
      case 'getTracksFromAlbum':
        console.log(unqfy.getTracksFromAlbum(argumentos[0]))
        break
      case 'printArtist':
        try{
          
          console.log(unqfy.getArtist(argumentos[0]))
        }catch (e) {
          console.log(e.message)
        }

        break;
      case 'printAlbum':
        try{
          console.log(unqfy.getAlbum(argumentos[0]))
        }catch (e) {
          console.log(e.message)
        }
        break;
      case 'printTrack':
        try{
          
          console.log('los argumentos son',argumentos[0])
          console.log(unqfy.getTrack(argumentos[0]))
        }catch (e) {
          console.log(e.message)
        }
        break;
      case 'getTracksMatchingArtist':
        console.log(unqfy.getTracksMatchingArtist(argumentos[0]));
        break;
      case 'getTracksMatchingGenres':
        console.log(unqfy.getTracksMatchingGenres(eval(argumentos[0])));
        break;
      case 'createPlaylist':
        unqfy.createPlaylist(argumentos[0], eval(argumentos[1]), eval(argumentos[2]));
        break;
      case 'searchByName':
        console.log(unqfy.searchByName(argumentos[0]));
        break;
      case 'getArtists':
        console.log(unqfy.artists)
        break
      case 'getPlaylists':
        console.log(unqfy.playlists)
        break
      default :
        console.log("no existe el metodo: ", metodo)
    }

  }

main();
