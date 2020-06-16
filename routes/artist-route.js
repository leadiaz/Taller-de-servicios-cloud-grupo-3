'use strict';

const express = require('express');
const api = express.Router();

const ArtistController = require('../controllers/artistController');

api.get('/artists/:id/' ,ArtistController.getArtist);
api.post('/artists/', ArtistController.saveArtist);
api.patch('/artists/:id/', ArtistController.updateArtist);
api.delete('/artists/:id/', ArtistController.deleteArtist);
api.get('/artists/', ArtistController.getArtistQuery);