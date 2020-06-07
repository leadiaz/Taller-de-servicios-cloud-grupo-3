var rp = require('request-promise');
var BASE_URL = "http://api.musixmatch.com/ws/1.1";
//"http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433"  letra
var op = {
    uri: "http://api.musixmatch.com/ws/1.1/track.search?q_track=Stuck With U (with Justin Bieber)",
    qs: {
        apikey: '4477a287ed1373afbeb10c146db00cfc'
    },
    json: true
};
function letraDeUnTema(trackname) {
    rp.get({
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
function letraDeTrack(id) {
    rp.get({
        uri: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" + id,
        qs: {
            apikey: '4477a287ed1373afbeb10c146db00cfc'
        },
        json: true
    }).then(function (response) {
        console.log(response.message.body);
    });
}
// letraDeUnTema("Stuck With U (with Justin Bieber)")
module.exports = { letraDeUnTema: letraDeUnTema };
