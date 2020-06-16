
const express = require('express');
const app = express();
const api = express.Router();

const errorApi = require('../erroresApi/errors');
const ArtistController = require('../controllers/artistController');
const PlaylistController = require('../controllers/playlistController');

api.get('/api/artists/:id/' ,ArtistController.getArtist);
api.post('/api/artists/', ArtistController.saveArtist);
api.patch('/api/artists/:id/', ArtistController.updateArtist);
api.delete('/api/artists/:id/', ArtistController.deleteArtist);
api.get('/api/artists/', ArtistController.getArtistQuery);

api.post('/api/playlists', PlaylistController.savePlaylist);
api.get('/api/playlists/:id', PlaylistController.getPlaylist);
api.delete('/api/playlists/:id', PlaylistController.deletePlaylist);
api.get('/api/playlists', PlaylistController.getPlaylistQuery);


app.set('json spaces',2);
const PORT = process.env.PORT || 9000;

app.use(api);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorApi);


app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});


