const AlbumExistsInArtistError = require('../Exceptions/albumException')
const ArtistExcepcion = require('../Exceptions/artistExcepcion')
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


//Agrega el artista 
app.post('/',(req,res) =>{
    const body = req.body  
    if(body.name && body.country) {
        try {
        unqfyApi.addArtist({name:body.name,country:body.country})
        saveUNQfy(unqfyApi)
        res.status(201)
        res.json(unqfyApi.getArtist(body.name))   
        } catch (error) {
            if(error instanceof ArtistExistsWithThatName){
               res.status(409)
               res.json({
                status: 409,
                errorCode: "RESOURCE_ALREADY_EXISTS"
                }
                )
            }
            else{
                throw error
            }
            
        }
        

    }else{
        res.send("Json mal formado")
    }
})

//Albums 
//Agregar el album al artista
app.post('/api',(req,res) =>{
    const body = req.body  
    if(body.artistId && body.name && body.year) {
        try {
            unqfyApi.addAlbum(body.artistId,{name:body.name,year:body.year})
        } catch (error) {
            if(error instanceof AlbumExistsInArtistError){
                res.status(409)
                res.json({status:409,errorCode:"RESOURCE_ALREADY_EXISTS"})
            }else{
                if(error instanceof ArtistExcepcion){
                    res.status(404)
                    res.json({
                        status: 404,
                        errorCode: "RELATED_RESOURCE_NOT_FOUND"
                        }
                        )
                }
                else{
                    throw error
                }
                
            }
            
        }
        saveUNQfy(unqfyApi)
        res.status(201)
        res.json(unqfyApi.getAlbum(body.name))
    }else{
        res.send("Json mal formado")
    }
})

//Denota el album con ese id
app.get('/api/albums/:id',(req,res) => {
    const id = req.params.id
    try {
        const album = unqfyApi.getAlbumById(id)
        res.status(200)
        res.json(album)
    } catch (error) {
        if(error instanceof NotExistAlbumError){
            res.status(404)
            res.json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
                }
                )
        }else{
            throw error
        }
        
    }
})

//Actualiza el año del album
app.patch('/api/albums/:id',(req,res)=> {
    const id = req.params.id;
    const year = req.body.year
    if(year){
        try {
            unqfyApi.getAlbumById(id).year = year
            saveUNQfy(unqfyApi)
            res.status(200)
            res.json(unqfyApi.getAlbumById(id))
        } catch (error) {
            if(error instanceof NotExistAlbumError){
                res.status(404)
                res.json({
                    status: 404,
                    errorCode: "RESOURCE_NOT_FOUND"
                }
                )

            }else{
                throw error
            }
            
        }

    }else{
        res.send("Json mal formado")
    }

    

})

//Borra el album con ese id
app.delete('/api/albums/:id',(req,res)=> {
    const  id = req.params.id
    try {
        unqfyApi.removeAlbum(id)
        saveUNQfy(unqfyApi)
        res.status(204)
    } catch (error) {
        if(error instanceof NotExistAlbumError){
            res.status(404)
            res.json({
                status: 404,
                errorCode: "RESOURCE_NOT_FOUND"
            }
            )

        }else{
            throw error
        }
    }
    

})

























//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ${7000} ');
})

