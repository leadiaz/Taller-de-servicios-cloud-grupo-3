const unqfy = require('../models/unqfy');
const express = require('express');
const app = express();
const fs = require('fs');
const errorApi = require('../erroresApi/errors');

function getUNQfy(filename = 'data.json') {
    let unq = new unqfy.UNQfy();
    if (fs.existsSync(filename)) {
        unq = unqfy.UNQfy.load(filename);
    }
    return unq;
}

function saveUNQfy(unq, filename = 'data.json') {
    unq.save(filename);
}
const unqfyApi = getUNQfy();   




//settings 
app.set('port',7000);
app.set('json spaces',2);

app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Agrega el artista a unqfy 
//Errror : Se debe manejar el error si el artista ya esta en unqfy
app.post('/',(req,res) =>{
    const body = req.body;  
    if(body.name && body.country) {
        unqfyApi.addArtist({name:body.name,country:body.country});
        saveUNQfy(unqfyApi);
        res.status(201);
        res.json(unqfyApi.getArtist(body.name));   
    }else{
        res.send('Json mal formado');
    }
});

//Albums 
//Agregar el album al artista 
//error : Se debe manjear el  error si el album ya existe en el artista o si el artista no existe 
app.post('/api',(req,res) =>{
    const body = req.body;  
    if(body.artistId && body.name && body.year) {
        unqfyApi.addAlbum(body.artistId,{name:body.name,year:body.year});
        saveUNQfy(unqfyApi);
        res.status(201);
        res.json(unqfyApi.getAlbum(body.name));
    }else{
        res.send('Json mal formado');
    }
});

//Retorna el album con ese id 
//Error: Se debe manjear el error si el album no existe
app.get('/api/albums/:id',(req,res) => {
    const id = req.params.id;
    const album = unqfyApi.getAlbumById(id);
    res.status(200);
    res.json(album);
    
});

//Actualiza el año del album con ese id 
//Error: Se debe manejar el error si el album no existe 
app.patch('/api/albums/:id',(req,res)=> {
    const id = req.params.id;
    const year = req.body.year;
    if(year){
        unqfyApi.getAlbumById(id).year = year;
        saveUNQfy(unqfyApi);
        res.status(200);
        res.json(unqfyApi.getAlbumById(id));
    }else{
        res.send('Json mal formado');
    }

    

});

//Elimina el album con ese id 
//Error : Se debe manejar el error si el album no existe 
app.delete('/api/albums/:id',(req,res)=> {
    const  id = req.params.id;
    unqfyApi.removeAlbum(id);
    saveUNQfy(unqfyApi);
    res.status(204);
});

//Tracks
app.get('/api/tracks/:id/lyrics',(req,res)=>{
    console.log('aaaaaaaaaaaaaaaaaaa');
    const id = req.params.id; 
    console.log('este id',id);
    const track = unqfyApi.getTrackById(id); 
    res.status(200);
    res.json({name:track.name,lyrics:track.getLyrics()});
});


app.use(errorApi);

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ${7000} ');
});

