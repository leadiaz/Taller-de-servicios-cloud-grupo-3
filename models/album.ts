/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Track } from "./track";
import { IdGenerator } from "./idGenerator";
import { TrackExistsInAlbumError } from "../Exceptions/trackExcepcion";

export class Album{
  tracks:Track[];
  id

  constructor(
    public idArtist?: number,
    public name?: string,
    public year?: number,

    ){
      this.id = IdGenerator.getNextId()
      this.tracks = []
  }
  toJSON(){
    return {id: this.id, name:this.name, year: this.year, tracks: this.tracks}
  }
  addTrack(track){
    if(this.existeTrack(track.name)){
      throw new TrackExistsInAlbumError(track.name)
    }
      this.tracks.push(track)
  }

  removeTracks() {
      this.tracks = []
  }

  removeTrack(anTrack){
    const index = this.tracks.indexOf(anTrack)
    this.tracks.splice(index, 1)
  }

  private existeTrack(name: any) {
    return this.tracks.some(track => {return track.name === name})
  }
  updateYear(year){
    this.year = year;
  }
}


