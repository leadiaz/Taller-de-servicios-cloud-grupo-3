const express = require('express');
const app = express();
const router = express.Router();
const errorApi = require('../erroresApi/errors');
const ControllerAlbum = require('../controllers/AlbumController');
const ControllerTrack = require('../controllers/TrackController');

const PORT = process.env.PORT || 7000;
router.post('/api/albums',ControllerAlbum.addAlbum);
router.get('/api/albums/:id',ControllerAlbum.getAlbum);
router.patch('/api/albums/:id',ControllerAlbum.updateAlbum);
router.delete('/api/albums/:id',ControllerAlbum.deleteAlbum);
router.get('/api/tracks/:id/lyrics',ControllerTrack.getTrack);
router.get('/api/albums',ControllerAlbum.searchAlbums);



router.use(express.json());
app.use('/api', router); 
app.use(router);
app.use(express.urlencoded({extended:true}));
app.use(errorApi);


app.set('json spaces',2);
//Starting the server
app.listen(PORT,()=>{
    console.log('Server on port', PORT);
});

