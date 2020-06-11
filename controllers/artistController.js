'use strict';

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


function getArtist(req, res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    res.status(200).send({artist: UNQfy.getArtistById(id)});
}
function saveArtist(req, res){
    const body = req.body;
    console.log(body);
    const UNQfy = getUNQfy();
    if(body.name && body.country){
        const artist = UNQfy.addArtist({name: body.name, country: body.country});
        saveUNQfy(UNQfy);
        res.status(200).send({artist: artist});
    }
}

function updateArtist(req, res){
    const id = req.params.id;
    const body = req.body;
    const UNQfy= getUNQfy();
    if(body.name && body.country){
        const artist = UNQfy.getArtistById(id);
        artist.update(body);
        saveUNQfy(UNQfy);
        res.status(200).send({artist: artist});   
    }
}

function deleteArtist(req, res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    UNQfy.removeArtist(id);
    saveUNQfy(UNQfy);
    res.status(204).send({message: 'Se ha borrado el artista con éxito'});
}

function getArtistQuery(req, res){
    const name = req.query.name;
    const UNQfy = getUNQfy();
    res.status(200).send({artists: UNQfy.searchByName(name).artists});

}

module.exports = {
    getArtist,
    saveArtist,
    updateArtist,
    deleteArtist,
    getArtistQuery
};

