import { Track } from "./track";

export class Album{
  constructor(
    public id?:Number,
    public name?: String,
    public year?: Number,
    public tracks?: Array<Track>
    ){
      this.tracks = new Array()
  }
  toJSON(){
    return {id: this.id, name:this.name, year: this.year, tracks: this.tracks}
  }
  addTrack(anTrack: Track){
    this.tracks.push(anTrack)
  }

  


}


