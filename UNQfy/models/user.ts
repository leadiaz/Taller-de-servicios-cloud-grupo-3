/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Track } from "./track";
import { IdGenerator } from "./idGenerator";

export class User {
      name: string
      id: number
      tracks:Track[]
    constructor(name: string){
        this.id = IdGenerator.getNextId()
        this.tracks = []
        this.name = name
    }


//El usuario escucha un tema
listenTrack(aTrack: Track){
    this.tracks.push(aTrack)
}

//Retorna: Los Tracks escuchado por un usuario
songsHeard():Set<Track>{
 return new Set(this.tracks)
}

//Retorna: las veces que un usuario escucho un tema 
howManyTimesListenTrack(aTrack: Track){
  let n = 0 
  this.tracks.forEach((track) => {if(track === aTrack){n = n +1}}           )
  return n;
}


}

