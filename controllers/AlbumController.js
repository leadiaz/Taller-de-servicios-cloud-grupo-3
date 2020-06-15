const fs = require('fs');
const unqmod = require('../models/unqfy');
const { DuplicatedError } = require('../erroresApi/DuplicatedError');
const { NotFoundError } = require('../erroresApi/NotFoundError');



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
            res.json(unqfyApi.getAlbum(body.name))
            
        } catch (error) {
            throw new DuplicatedError(body.name)  
        }
    }else{
        res.send("Json mal formado")
    }
}

function getAlbum(req,res){
    const id = req.params.id
    try {
        const album = unqfyApi.getAlbumById(id)
        res.status(200)
        res.json(album)
        
    } catch (error) {
        throw new NotFoundError(id)
        
    }
}

function updateAlbum(req,res){
    const id = req.params.id;
    const dody = req.dody
    console.log('esto es el body', dody)
    if(dody.year){
        unqfyApi.getAlbumById(id).year = dody.year
        console.log('estoy aca')
        saveUNQfy(unqfyApi)
        res.status(200)
        res.json(unqfyApi.getAlbumById(id))
    }else{
        res.send("Json mal formado")
    }
}


function deleteAlbum(req,res){
    const  id = req.params.id
    try {
        unqfyApi.removeAlbum(id)
        saveUNQfy(unqfyApi)
        res.status(204)
        
    } catch (error) {
        throw new NotFoundError (id)
    }
    
}


function searchAlbums(req,res) {
    const nameAlbum = req.query.name.toLowerCase()
    const albums = unqfyApi.searchAlbums(nameAlbum)
    res.status(200)
    res.json(albums)

}


module.exports = {
    addAlbum,
    getAlbum,
    updateAlbum,
    deleteAlbum,
    searchAlbums,
};