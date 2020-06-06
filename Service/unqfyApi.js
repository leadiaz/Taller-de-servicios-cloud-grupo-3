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


//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port ${7000} ');
})