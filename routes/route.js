
const express = require('express');
const app = express();
const api = express.Router();
const errorApi = require('../erroresApi/errors');
const ArtistController = require('../controllers/artistController');

const PORT = process.env.PORT || 9000;
api.get('/api/artists/:id', ArtistController.getArtist);
api.post('/api/artists/', ArtistController.saveArtist);
api.patch('/api/artists/:id', ArtistController.updateArtist);
api.delete('/api/artists/:id', ArtistController.deleteArtist);
api.get('/api/artists', ArtistController.getArtistQuery);


app.use(api);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorApi);

// app.set('port',7000);
app.set('json spaces',2);


app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});


