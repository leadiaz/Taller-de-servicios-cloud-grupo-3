
const express = require('express');
const app = express();
const api = express.Router();

const errorApi = require('../erroresApi/errors');
const ArtistController = require('../controllers/artistController');
const PlaylistController = require('../controllers/playlistController');
const ControllerAlbum = require('..//controllers/AlbumController')
const ControllerTrack = require('..//controllers/TrackController')


api.get('/api/artists/:id/' ,ArtistController.getArtist);
api.post('/api/artists', ArtistController.saveArtist);
api.put('/api/artists/:id/', ArtistController.updateArtist);
api.delete('/api/artists/:id', ArtistController.deleteArtist);
api.get('/api/artists/', ArtistController.getArtistQuery);

api.post('/api/playlists', PlaylistController.savePlaylist);
api.get('/api/playlists/:id', PlaylistController.getPlaylist);
api.delete('/api/playlists/:id', PlaylistController.deletePlaylist);
api.get('/api/playlists/', PlaylistController.getPlaylistQuery);

//Albums y Tracks
api.post('/api/albums',ControllerAlbum.addAlbum)
api.get('/api/albums/:id',ControllerAlbum.getAlbum)
api.patch('/api/albums/:id',ControllerAlbum.updateAlbum)
api.delete('/api/albums/:id',ControllerAlbum.deleteAlbum)
api.get('/api/tracks/:id/lyrics',ControllerTrack.getTrack)
api.get('/api/albums',ControllerAlbum.searchAlbums)






app.set('json spaces',2);
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);
app.use(errorApi);




app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});


