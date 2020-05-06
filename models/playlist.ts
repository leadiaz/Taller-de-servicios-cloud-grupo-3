import{Track} from "./track"
import { IdGenerator } from "./idGenerator";

export class Playlist{
    
    constructor(
        public id?: Number,
        public name?: String,
        public tracks?: Array<Track>,
        
    ){
        this.id = IdGenerator.getNextId()
        this.tracks = new Array();
    }
    toJSON(){
        return {id: this.id, name: this.name, tracks: this.tracks}
    }


    duration():Number{
     return 0;
    }

    hasTrack(aTrack):Boolean{
        return this.tracks.includes(aTrack)
    }
    addTracks(tracks: Track[], maxDuration: Number) {
        // var item = items[Math.floor(Math.random() * items.length)];
        var n: any = 0
        tracks.forEach((track) => {
            if(n < maxDuration && track.duration < maxDuration){
               this.tracks.push(track)
               n = n + track.duration
            }
            
        })
        
      }

    

    removeAtrack(aTrack){
        this.tracks.splice(this.tracks.indexOf(aTrack),1)
    }
}


