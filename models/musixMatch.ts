const rp = require('request-promise');

const BASE_URL = "http://api.musixmatch.com/ws/1.1";

//"http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=15953433"  letra
var op = {
    uri: "http://api.musixmatch.com/ws/1.1/track.search?q_track=Stuck With U (with Justin Bieber)" ,
    qs: {
      apikey: '4477a287ed1373afbeb10c146db00cfc',
     
  },
    json: true
  }
  export function letraDeUnTema(trackname) {
   return rp.get({
      uri: "http://api.musixmatch.com/ws/1.1/track.search?q_track=" +trackname ,
      qs: {
        apikey: '4477a287ed1373afbeb10c146db00cfc',
    },
      json: true
    }).then((response) =>{
      var header = response.message.header;
      var body = response.message.body
      if (header.status_code !== 200){
                throw new Error('status code != 200');
            }
   
        return body.track_list[0].track.track_id
      
    }).then((id) => {return letraDeTrack(id)})
  }

  function letraDeTrack(id) {
  return  rp.get({
      uri: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" +id ,
      qs: {
        apikey: '4477a287ed1373afbeb10c146db00cfc',
    },
      json: true
    }).then((response) =>{
        //console.log(response.message.body.lyrics.lyrics_body)
        {return response.message.body.lyrics.lyrics_body}
      
    })
  }
  

 // letraDeUnTema("Stuck With U (with Justin Bieber)")


