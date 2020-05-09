import { Track } from "./track";
import {TrackExistsInAlbumError} from "../Exceptions/trackExcepcion";
import { IdGenerator } from "./idGenerator";

export class Album{
  tracks:Track[]
  constructor(
    public idArtist?: Number,
    public id?:Number,
    public name?: String,
    public year?: Number,
    
    ){
      this.id = IdGenerator.getNextId()
      this.tracks = []
  }
  toJSON(){
    return {idArtist: this.idArtist, id: this.id, name:this.name, year: this.year, tracks: this.tracks}
  }
  addTrack(track){
    // if(this.existeTrack(track.name)){
    //   throw new TrackExistsInAlbumError(track.name)
    // }
      this.tracks.push(track)
  }
  removeTracks() {
      this.tracks = null
  }
  removeTrack(anTrack){
    let index = this.tracks.indexOf(anTrack)
    this.tracks.splice(index, 1)
  }

  private existeTrack(name: any) {
    return this.tracks.some(track => {return track.name === name})
  }
}