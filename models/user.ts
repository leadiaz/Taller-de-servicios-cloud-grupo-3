import { Track } from "./track";

export class User {
    constructor(
        public name?:String,
        public id?:Number,
        public tracks?:Array<Track>
    )
    {
        this.tracks = new Array()
        
        
    }


//El usuario escucha un tema
listenTrack(aTrack){
    this.tracks.push(aTrack)
}


 sinRepetidos(list){
    const xs = new Array()
    list.forEach((elem) => {if (!xs.includes(elem))  {xs.push(elem)}})
    return xs
  }

//Denota: Los temas escuchado por un usuario
songsHeard():Track[]{
 return this.sinRepetidos(this.tracks)
}

//Denota: las veces que un usuario escucho un tema 
howManyTimesListenTrack(aTrack){
   var n = 0 
  this.tracks.forEach((track) => {if(track === aTrack){n = n +1}}           )
  return n;
}


}