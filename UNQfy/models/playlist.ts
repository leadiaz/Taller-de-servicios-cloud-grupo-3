/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import{Track} from "./track"
import { IdGenerator } from "./idGenerator";

export class Playlist{
    tracks: any[];
    id: number;
    duration: number;

    constructor(
        public name?: string,
    ){
        this.id = IdGenerator.getNextId()
        this.tracks = []
        this.duration = 0
    }
    toJSON(){
        return {id: this.id, name: this.name, tracks: this.tracks}
    }

    hasTrack(aTrack):boolean{
        return this.tracks.includes(aTrack)
    }
    addTracks(tracks: Track[], maxDuration) {
        // var item = items[Math.floor(Math.random() * items.length)];
        let n = 0
        tracks.forEach((track) => {
            if(n < maxDuration && track.duration < maxDuration){
               this.tracks.push(track)
               n = n + track.duration
               this.duration += track.duration
            } 
        })
    }
    addTrack(track){
        this.duration += track.duration
        this.tracks.push(track)
    }
    removeAtrack(aTrack){
        this.tracks.splice(this.tracks.indexOf(aTrack),1)
    }
}


