const unqfy = require('../models/unqfy')
const express = require('express')
const app = express()
const rp = require('request-promise');
const fs = require('fs')

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
const unqfyApi = getUNQfy()   





//settings 
app.set('port',7000)
app.set('json spaces',2)

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.post('/',(req,res) =>{
    const body = req.body  
    if(body.name && body.country) {
        unqfyApi.addArtist({name:body.name,country:body.country})
        saveUNQfy(unqfyApi)
        res.status(201)
        res.json(unqfyApi.getArtist(body.name))

    }else{
        res.send("Json mal formado")
    }
})

//Albums 
//Agregar el album a l artista
app.post('/api',(req,res) =>{
    const body = req.body  
    if(body.artistId && body.name && body.year) {
        unqfyApi.addAlbum(body.artistId,{name:body.name,year:body.year})
        saveUNQfy(unqfyApi)
        res.status(201)
        res.json(unqfyApi.getAlbum(body.name))

    }else{
        res.send("Json mal formado")
    }
})

//Retorna el album con ese id
app.get('/api/albums/:id',(req,res) => {
    const id = req.params.id
   
    res.status(200)
    res.json(unqfyApi.getAlbumById(id))
})

//Actualiza el año del album
app.patch('/api/albums/:id',(req,res)=> {
    const id = req.params.id;
    const year = req.body.year
    unqfyApi.getAlbumById(id).year = year
    saveUNQfy(unqfyApi)
    res.status(200)
    res.json(unqfyApi.getAlbumById(id))
    

})

//Borra el album con ese id
app.delete('/api/albums/:id',(req,res)=> {
    const  id = req.params.id
    unqfyApi.removeAlbum(id)
    saveUNQfy(unqfyApi)
    res.status(204)

})

























//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ${7000} ');
})

