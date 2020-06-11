'use strict';

const fs = require('fs');
const unqmod = require('../models/unqfy');
const JSONException =  require('../Exceptions/jsonException');

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

function savePlaylist(req, res){
    const body = req.body;
    const UNQfy = getUNQfy();
    //esto esta mal, hay que ver el caso de crear playlist por trackIds
    if(body.name && body.maxDuration && body.genres){
        const playlist = UNQfy.createPlaylist(body);
        saveUNQfy(UNQfy);
        res.status(201).send({playlist: playlist});
    }else{
        throw new JSONException.JSONException;
    }
}

function getPlaylist(req, res){
    const id = req.param.id;
    const UNQfy =  getUNQfy();
    res.status(200).send({playlist: UNQfy.getPlaylistById(id)});
}

module.exports = {
    savePlaylist
}