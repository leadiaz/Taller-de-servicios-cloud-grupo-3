const fs = require('fs');
const unq = require('../models/unqfy');
const  NotFoundError  = require('../erroresApi/NotFoundError');

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
    console.log(id)
    if(id){

    try{
    const track = unqfyApi.getTrackById(id) 
    res.status(200)
    res.json({name:track.name,lyrics:track.getLyrics()})
    }catch(error) {
        throw new NotFoundError.NotFoundError(id)
    }
    }else{
        res.send("Json mal formado")
    }
}

module.exports = {
    getTrack
}
