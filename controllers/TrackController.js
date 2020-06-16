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


const unqfyApi = getUNQfy()

function getTrack (req,res){
    const id = req.params.id 
    if(id){
    try{
    const track = unqfyApi.getTrackById(id) 
    track.getLyrics().then((lyrics)=>{
        res.status(200)
        res.json({name:track.name,lyrics:lyrics})
    })
    }catch(error) {
        throw new ERROR_API.NotFound('Track')
    }
    }else{
        throw new JSONException.JSONException();
    }
}

module.exports = {
    getTrack
}
