import { IdGenerator } from "./idGenerator"
import{letraDeUnTema} from "./musixMatch"


export class Track{
    constructor(
        public idAlbum?: Number,
        public id?: Number,
        public name?: String,
        public duration?:Number,
        public genres?: Array<String>,
        public lyrics?: String ,
    ){
        this.id = IdGenerator.getNextId()
        this.genres = new Array()
        this.lyrics = null
    }
    toJSON(){
        return {idAlbum: this.idAlbum,id: this.id, name: this.name, duration: this.duration, genres: this.genres}
    }

    //Dado un array de Genres retorna true si el track contiene algun genre 
    anyGenre(genres){
        return genres.some(genre => {return this.genres.includes(genre)})
    }


   async getLyrics(){
        if( this.lyrics == null){
          this.lyrics = await letraDeUnTema(this.name)   
          return this.lyrics   
        }
        else{
            console.log("No hace falta volver hacer el request")
            return this.lyrics
        }  
    }

   

    
}