
const rp = require('request-promise');

const {unqfy} = require('../endpoints');
const API = unqfy;
const errors = require('./Exceptions/excepcionesAPI');
const ServerInternalError = errors.InternalServerError;

export class Observable{
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
        rp.post(options).catch(() => {
            throw new ServerInternalError();
        }); 
        console.log(options.url);
    }
}
