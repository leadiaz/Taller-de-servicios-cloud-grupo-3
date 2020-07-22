/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const unqmod = require('../models/unqfy');
const ERROR_API = require('../Exceptions/excepcionesAPI');
const { ArtistExcepcion } = require('../Exceptions/artistExcepcion');

function getUNQfy(filename) {
    if (filename === void 0) { filename = 'data.json'; }
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}

function saveUNQfy(unq, filename = 'data.json') {
    unq.save(filename);
}

function addAlbum(req,res){
    const body = req.body; 
    const UNQfy = getUNQfy();
    if(body.artistId && body.name && body.year) {
        try {
            const album = UNQfy.addAlbum(body.artistId,{name:body.name,year:body.year});
            saveUNQfy(UNQfy);
            res.status(201);
            res.json(album.toJSON());           
        } catch (error) {
            if(error instanceof ArtistExcepcion) {
                throw new ERROR_API.RelatedResourceNotFound();
            }else{
                throw new ERROR_API.Duplicate();   
            }
        }
    }else{
        throw new ERROR_API.JSONException();
    }
}

function getAlbum(req,res){
    const id = req.params.id
    const UNQfy = getUNQfy();
    try {
        const album = UNQfy.getAlbumById(id);
        res.status(200);
        res.json(album);
    } catch (error) {
        throw new ERROR_API.NotFound();
        
    }
}

function updateAlbum(req,res){
    const id = req.params.id;
    const body = req.body;
    const UNQfy = getUNQfy();
    if(body.year){
        try {
            const album = UNQfy.getAlbumById(id);
            album.updateYear(body.year);
            saveUNQfy(UNQfy);
            res.status(200).json(album.toJSON());
        } catch (error) {
            throw new ERROR_API.NotFound();
        }
    }else{
        throw new ERROR_API.JSONException();
    }
}

function deleteAlbum(req,res){
    const  id = req.params.id;
    const UNQfy = getUNQfy();
    try {
        UNQfy.removeAlbum(id);
        saveUNQfy(UNQfy);
        res.status(204).json({message: 'Borrado exitosamente'});
    } catch (error) {
        throw new ERROR_API.NotFound();
    }
}

function searchAlbums(req,res) {
    const nameAlbum = req.query.name;
    const UNQfy = getUNQfy();
    if(nameAlbum) {
        const albums = UNQfy.searchByName(nameAlbum).albums;
        res.status(200);
        res.json(albums);
    }else{
        res.status(200);
        res.json(UNQfy.getAlbums());
    }
}

module.exports = {
    addAlbum,
    getAlbum,
    updateAlbum,
    deleteAlbum,
    searchAlbums,
};