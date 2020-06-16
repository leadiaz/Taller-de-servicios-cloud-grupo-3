'use strict';

const fs = require('fs');
const unqmod = require('../models/unqfy');
const JSONException =  require('../Exceptions/jsonException');
const TrackError = require('../Exceptions/trackExcepcion');
const PlaylistException = require('../Exceptions/playListExcepcion');
const ERROR_API = require('../Exceptions/excepcionesAPI');

function getUNQfy(filename) {
    if (filename === void 0) { filename = 'data.json'; }
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
}

function saveUNQfy(unq, filename = 'data.json') {
    unq.save(filename);
}

function savePlaylist(req, res){
    const body = req.body;
    const UNQfy = getUNQfy();
    //esto esta mal, hay que ver el caso de crear playlist por trackIds
    if(body.name){
        const playlist = UNQfy.createPlaylist(body.name, body.genres, body.maxDuration);
        if(body.tracks){
            const trackIds = body.tracks;
            try {
                agregarTracks(trackIds, UNQfy, playlist);
                saveUNQfy(UNQfy);
                res.status(201).send({playlist: playlist});
            } catch (error) {
                throw error;
            }    
        }else{
            saveUNQfy(UNQfy);
            res.status(201).send({playlist: playlist});
        }
    }else{
        throw new JSONException.JSONException();
    }
}

function agregarTracks(trackIds, UNQfy, playlist) {
    trackIds.forEach((track_id) => {
        try {
            const element = UNQfy.getTrackById(track_id);
            playlist.addTrack(element);
        }
        catch (error) {
            throw new ERROR_API.NotFound('Track');
        }
    });
}

function getPlaylist(req, res){
    const id = req.param.id;
    const UNQfy =  getUNQfy();
    try {
        res.status(200).send({playlist: UNQfy.getPlaylistById(id)});    
    } catch (error) {
        throw new ERROR_API.NotFound('Playlist');
    }
}

function deletePlaylist(req, res){
    const id = req.param.id;
    const UNQfy = getUNQfy();
    try {
        UNQfy.removePlayListById(id);
        saveUNQfy(UNQfy);
        res.status(204);
    } catch (error) {
        throw new ERROR_API.NotFound('Playlist');
    }
}

function getPlaylistQuery(req, res){
    const query = req.query;
    const UNQfy = getUNQfy();
    let playlists = UNQfy.searchByName(query.name).playlists;
    playlists = playlists.filter((playlist) =>{
        return playlist.duration < query.durationLT
                && playlist.duration > query.durationGT;
    });
    res.status(200).json({playlists: playlists});
}

module.exports = {
    savePlaylist,
    getPlaylist,
    deletePlaylist,
    getPlaylistQuery
};