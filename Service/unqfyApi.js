const express = require('express')
const app = express()
const api = express.Router()
const errorApi = require('../erroresApi/errors')
const ControllerAlbum = require('../controllers/AlbumController')
const ControllerTrack = require('../controllers/TrackController')
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 7000
api.post('/api/albums',ControllerAlbum.addAlbum)
api.get('/api/albums/:id',ControllerAlbum.getAlbum)
api.patch('/api/albums/:id',ControllerAlbum.updateAlbum)
api.delete('/api/albums/:id',ControllerAlbum.deleteAlbum)
api.get('/api/tracks/:id/lyrics',ControllerTrack.getTrack)
api.get('/api/albums',ControllerAlbum.searchAlbums)



app.use('/api', api); 
api.use(bodyParser.json())
app.use(api)
app.use(bodyParser.urlencoded({extended:true}));
app.use(errorApi);


app.set('json spaces',2)
//Starting the server
app.listen(PORT,()=>{
    console.log('Server on port', PORT)
});