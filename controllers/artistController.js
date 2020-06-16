'use strict';

const fs = require('fs');
const unqmod = require('../models/unqfy');
const ArtistException = require('../Exceptions/artistExcepcion');
const JSONException = require('../Exceptions/jsonException');

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


function getArtist(req, res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    try {
        res.status(200).json({artist: UNQfy.getArtistById(id)});    
    } catch (error) {
        throw new ArtistException.ArtistExcepcion();
    }
    
}
function saveArtist(req, res){
    const body = req.body;
    console.log(body);
    const UNQfy = getUNQfy();
    if(body.name && body.country){
        try {
            const artist = UNQfy.addArtist({name: body.name, country: body.country});
            saveUNQfy(UNQfy);
            res.status(200).json({artist: artist});    
        } catch (error) {
            throw ArtistException.ArtistExistsWithThatName(body.name);
        }
        
    }else{
        throw new JSONException.JSONException();
    }
}

function updateArtist(req, res){
    const id = req.params.id;
    const body = req.body;
    const UNQfy= getUNQfy();
    if(body.name && body.country){
        try {
            const artist = UNQfy.getArtistById(id);
            artist.update(body);
            saveUNQfy(UNQfy);
            res.status(200).json({artist: artist});    
        } catch (error) {
            throw new ArtistException.ArtistExcepcion();
        }
           
    }else{
        throw new JSONException.JSONException();
    }
}

function deleteArtist(req, res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    try {
        UNQfy.removeArtist(id);
        saveUNQfy(UNQfy);
        res.status(204).json({message: 'Se ha borrado el artista con éxito'});   
    } catch (error) {
        throw new ArtistException.ArtistExcepcion();
    }
}

function getArtistQuery(req, res){
    const name = req.query.name;
    const UNQfy = getUNQfy();
    res.status(200).json({artists: UNQfy.searchByName(name).artists});

}

module.exports = {
    getArtist,
    saveArtist,
    updateArtist,
    deleteArtist,
    getArtistQuery
};

