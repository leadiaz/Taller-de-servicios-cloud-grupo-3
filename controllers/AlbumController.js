const fs = require('fs');
const unqmod = require('../models/unqfy');



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
    const body = req.body  
    console.log(body)
    if(body.artistId && body.name && body.year) {
        console.log(body)
        unqfyApi.addAlbum(body.artistId,{name:body.name,year:body.year})
        saveUNQfy(unqfyApi)
        res.status(201)
        res.json(unqfyApi.getAlbum(body.name))
    }else{
        res.send("Json mal formado")
    }
}

function getAlbum(req,res){
    const id = req.params.id
    console.log(id)
    const album = unqfyApi.getAlbumById(id)
    res.status(200)
    res.json(album)
}

function updateAlbum(req,res){
    const id = req.params.id;
    const year = req.body.year
    if(year){
        unqfyApi.getAlbumById(id).year = year
        saveUNQfy(unqfyApi)
        res.status(200)
        res.json(unqfyApi.getAlbumById(id))
    }else{
        res.send("Json mal formado")
    }
}


function deleteAlbum(req,res){
    const  id = req.params.id
    unqfyApi.removeAlbum(id)
    saveUNQfy(unqfyApi)
    res.status(204)
}

function getTrack (req,res){
    const id = req.params.id 
    const track = unqfyApi.getTrackById(id) 
    res.status(200)
    res.json({name:track.name,lyrics:track.getLyrics()})
}


module.exports = {
    addAlbum,
    getAlbum,
    updateAlbum,
    deleteAlbum,
    getTrack
};