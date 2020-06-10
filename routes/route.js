
const express = require('express');
const app = express();
const errorApi = require('../erroresApi/errors');
const ArtistController = require('../controllers/artistController');


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('port',7000);
app.set('json spaces',2);


app.listen(app.get('port'),()=>{
    console.log('Server on port ${7000} ');
});

app.get('/api/artists/:id', ArtistController.getArtist);
app.post('/api/artists/', ArtistController.saveArtist);
app.patch('/api/artists/:id', ArtistController.updateArtist);

