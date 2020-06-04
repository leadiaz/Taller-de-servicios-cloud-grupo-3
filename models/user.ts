import { Track } from "./track";
import { IdGenerator } from "./idGenerator";

export class User {
      name: string
      id: Number
      tracks:Track[]
    constructor(name){
        this.id = IdGenerator.getNextId()
        this.tracks = []
        this.name = name
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

