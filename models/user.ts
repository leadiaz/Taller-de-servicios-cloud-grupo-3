import { Track } from "./track";
import { IdGenerator } from "./idGenerator";

export class User {
    constructor(
        public name?:String,
        public id?:Number,
        public tracks?:Array<Track>
    )
    {
        this.id = IdGenerator.getNextId()
        this.tracks = new Array()
        
        
    }


//El usuario escucha un tema
listenTrack(aTrack){
    this.tracks.push(aTrack)
}

//Retorna: Los Tracks escuchado por un usuario
songsHeard():Set<Track>{
 return new Set(this.tracks)
}

//Retorna: las veces que un usuario escucho un tema 
howManyTimesListenTrack(aTrack){
  var n = 0 
  this.tracks.forEach((track) => {if(track === aTrack){n = n +1}}           )
  return n;
}


}

