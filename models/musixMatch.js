"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
var rp = require('request-promise');
function letraDeUnTema(trackname) {
    return rp.get({
        uri: "http://api.musixmatch.com/ws/1.1/track.search?q_track=" + trackname,
        qs: {
            apikey: '4477a287ed1373afbeb10c146db00cfc'
        },
        json: true
    }).then(function (response) {
        var header = response.message.header;
        var body = response.message.body;
        if (header.status_code !== 200) {
            throw new Error('status code != 200');
        }
        return body.track_list[0].track.track_id;
    }).then(function (id) { return letraDeTrack(id); });
}
exports.letraDeUnTema = letraDeUnTema;
function letraDeTrack(id) {
    return rp.get({
        uri: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + id,
        qs: {
            apikey: '4477a287ed1373afbeb10c146db00cfc'
        },
        json: true
    }).then(function (response) {
        {
            return response.message.body.lyrics.lyrics_body;
        }
    });
}
