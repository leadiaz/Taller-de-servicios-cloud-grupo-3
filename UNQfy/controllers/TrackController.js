/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const unq = require('../models/unqfy');
const ERROR_API = require('../Exceptions/excepcionesAPI');

function getUNQfy(filename) {
    if (filename === void 0) { filename = 'data.json'; }
    let unqfy = new unq.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unq.UNQfy.load(filename);
    }
    return unqfy;
}

function getTrack (req,res){
    const id = req.params.id;
    const UNQfy = getUNQfy();
    if(id){
        try{
            const track = UNQfy.getTrackById(id);
            track.getLyrics().then((lyrics)=>{
            res.status(200);
            res.json({name:track.name,lyrics:lyrics});
            });
        }catch(error) {
            throw new ERROR_API.NotFound();
        }
    }else{
        throw new ERROR_API.JSONException();
    }
}

module.exports = {
    getTrack
};
