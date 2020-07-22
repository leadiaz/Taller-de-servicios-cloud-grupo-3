/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const fs = require('fs');
const unqmod = require('../models/unqfy');
const ERROR_API = require('../Exceptions/excepcionesAPI');

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
        res.status(200).json(UNQfy.getArtistById(id));    
    } catch (error) {
        throw new ERROR_API.NotFound();
    }
    
}
function saveArtist(req, res){
    const body = req.body;
    const UNQfy = getUNQfy();
    if(body.name && body.country){
        try {
            const artist = UNQfy.addArtist({name: body.name, country: body.country});
            saveUNQfy(UNQfy);
            res.status(201).json(artist);
        } catch (error) {
            throw new ERROR_API.Duplicate();
        }
    }else{
        throw new ERROR_API.JSONException();
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
            res.status(200).json(artist);    
        } catch (error) {
            throw new ERROR_API.NotFound();
        }
           
    }else{
        throw new ERROR_API.JSONException();
    }
}

function deleteArtist(req, res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    try {
        UNQfy.removeArtist(id);
        saveUNQfy(UNQfy);
        res.status(204);
        res.json({message: 'borrado correctamente'});   
    } catch (error) {
        throw new ERROR_API.NotFound();
    }
}

function getArtistQuery(req, res){
    
    const name = req.query.name;
    const UNQfy = getUNQfy();
    if(name){
        res.status(200).json(UNQfy.searchByName(name).artists);
    }
    else{
        res.status(200).json(UNQfy.artists);
    }
}

module.exports = {
    getArtist,
    saveArtist,
    updateArtist,
    deleteArtist,
    getArtistQuery
};

