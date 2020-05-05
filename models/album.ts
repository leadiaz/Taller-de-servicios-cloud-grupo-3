import { Track } from "./track";
import {TrackExistsInAlbumError} from "../Exceptions/trackExcepcion";

export class Album{
  constructor(
    public idArtist?: Number,
    public id?:Number,
    public name?: String,
    public year?: Number,
    public tracks?: Array<Track>
    ){
      this.tracks = new Array()
  }
  toJSON(){
    return {idArtist: this.idArtist, id: this.id, name:this.name, year: this.year, tracks: this.tracks}
  }
  addTrack(idTrack, trackData){
    if(this.existeTrack(trackData.name)){
      throw new TrackExistsInAlbumError(trackData.name)
    }
    else {
      const track = new Track()
      track.idAlbum = this.id
      track.id = idTrack
      track.name = trackData.name
      track.duration = trackData.duration
      track.genres = !trackData.genres ? new Array<String>() : trackData.genres
      this.tracks.push(track)
      return track
    }
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


