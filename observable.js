
const rp = require('request-promise');

const API = 'http://localhost:8080/api';
const errors = require('./Exceptions/excepcionesAPI');
const ServerInternalError = errors.InternalServerError;

class Observable{
    constructor(){}
    change(artista, album){
        this.changeAddAlbum(artista,album);
    }
    changeAddAlbum(artista, album){
        const options = {
            url: API + '/notify',
            body: {
                artistId: artista.artistId,
                subject: 'Nuevo Album para el artista ' + artista.name,
                message: 'Se ha agregado el album ' + album.name + ' al artista ' + artista.name,
                from: 'pruebawebservices@gmail.com',
            },
            json: true,
        };
        rp.post(options).then(() => {
            console.log('Notificaciones enviadas con exitos'); 
        }).catch((error) => {
            if (error) {
                throw new ServerInternalError();
            }
        }); 
    }
}

module.exports = {
    Observable: Observable
};