'use strict';

const fs = require('fs');
const unqmod = require('../models/unqfy');

function getUNQfy(filename) {
    if (filename === void 0) { filename = 'data.json'; }
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
    }
    console.log(unqfy);
    return unqfy;
}

function saveUNQfy(unq, filename = 'data.json') {
    unq.save(filename);
}


function getArtist(req, res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    const artist = UNQfy.getArtistById(id);
    if(!artist){
        res.status(404).send({message: 'No existe el artista'});
    }else{
        res.status(200).send(artist);
    }
}
function saveArtist(req, res){
    const body = req.body;
    console.log(body)
    const UNQfy = getUNQfy();
    if(body.name && body.country){
        const artist = UNQfy.addArtist({name: body.name, country: body.country});
        saveUNQfy(UNQfy);
        res.status(200).send({artist: artist});
    }else{
        res.status(202).send({message: 'Formato JSON no valido'});
    }
}

function updateArtist(req, res){
    const id = req.params.id;
    const body = req.body;
    const UNQfy= getUNQfy();
    if(body.name && body.country){
        const artist = UNQfy.getArtistById(id);
        if(artist){
            artist.update(body);
            saveUNQfy(UNQfy);
            res.status(200).send({artist: artist});
        }else{
            res.status(404).send({message: 'No existe el artista con este id: ' + id});
        }
    }else{
        res.status(202).send({message: 'Formato JSON no valido'});
    }
}

function deleteArtist(req, res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    UNQfy.removeArtist(id)

}

module.exports = {
    getArtist,
    saveArtist,
    updateArtist
};

