import{Track} from "./track"

export class Playlist{
    
    constructor(
        public id?: Number,
        public name?: String,
        public tracks?: Array<Track>,
        
    ){
        this.tracks = new Array();
    }


    duration():Number{
     return 0;
    }

    hasTrack(aTrack):Boolean{
        return this.tracks.includes(aTrack)
    }
    addTracks(tracks: Track[], maxDuration: Number) {
        // var item = items[Math.floor(Math.random() * items.length)];
        this.tracks = this.tracks.concat(tracks)
      }

    removeAtrack(aTrack){
        this.tracks.splice(this.tracks.indexOf(aTrack),1)
    }
}


