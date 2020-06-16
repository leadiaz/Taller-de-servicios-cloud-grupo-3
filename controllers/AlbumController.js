const fs = require('fs');
const unqmod = require('../models/unqfy');
const ERROR_API = require('../Exceptions/excepcionesAPI');
const { ArtistExcepcion } = require('../Exceptions/artistExcepcion');
const JsonException = require('../Exceptions/jsonException')


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

const unqfyApi = getUNQfy()


function addAlbum(req,res){
    const body = req.body; 
    if(body.artistId && body.name && body.year) {
        try {
            unqfyApi.addAlbum(body.artistId,{name:body.name,year:body.year})
            saveUNQfy(unqfyApi)
            res.status(201)
            res.json(unqfyApi.getAlbum(body.name).toJSON())
            
        } catch (error) {
            if(error instanceof ArtistExcepcion) {
                throw new ERROR_API.RELATED_RESOURCE_NOT_FOUND('Artist')
            }else{
                throw new ERROR_API.Duplicate('Album')   
            }
        }
    }else{
        throw new JsonException.JSONException();
    }
}

function getAlbum(req,res){
    const id = req.params.id
    try {
        const album = unqfyApi.getAlbumById(id)
        res.status(200)
        res.json(album)
        
    } catch (error) {
        throw new ERROR_API.NotFound('Album')
        
    }
}

function updateAlbum(req,res){
    const id = req.params.id;
    if(req.body.year){
        try {
            unqfyApi.getAlbumById(id).year = req.body.year
            console.log('estoy aca')
            saveUNQfy(unqfyApi)
            res.status(200)
            res.json(unqfyApi.getAlbumById(id))
            
        } catch (error) {
            throw new ERROR_API.NotFound('Album')
            
        }
       
    }else{
        throw new JSONException.JSONException();
    }
}


function deleteAlbum(req,res){
    const  id = req.params.id
    try {
        unqfyApi.removeAlbum(id)
        saveUNQfy(unqfyApi)
        res.status(204)
        
    } catch (error) {
        throw new ERROR_API.NotFound('Album')
    }
    
}


function searchAlbums(req,res) {
    const nameAlbum = req.query.name
    if(nameAlbum != undefined) {
        const albums = unqfyApi.searchAlbums(nameAlbum)
        res.status(200)
        res.json(albums)
    }else{
        res.status(200)
        res.json(unqfyApi.getAlbums())
    }
}


module.exports = {
    addAlbum,
    getAlbum,
    updateAlbum,
    deleteAlbum,
    searchAlbums,
};