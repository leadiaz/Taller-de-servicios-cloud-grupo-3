/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const rp = require('request-promise');


  export function letraDeUnTema(trackname: string) {
   return rp.get({
      uri: "http://api.musixmatch.com/ws/1.1/track.search?q_track=" +trackname ,
      qs: {
        apikey: '4477a287ed1373afbeb10c146db00cfc',
    },
      json: true
    }).then((response) =>{
      const header = response.message.header;
      const body = response.message.body
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
        {return response.message.body.lyrics.lyrics_body}
      
    })
  }
  



