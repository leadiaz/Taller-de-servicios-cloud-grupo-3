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
    unqfy.evalMethod(method, argumetos);
    // saveUNQfy(unqfy)
}
main();
