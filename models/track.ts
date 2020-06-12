import { IdGenerator } from "./idGenerator"
import{letraDeUnTema} from "./musixMatch"
import { cpuUsage } from "process"


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
          await this.buscarLyrics()   
          return this.lyrics   
        }
        else{
            console.log("entro por aca")
            return this.lyrics
        }  
    }

    async buscarLyrics(){
        const letra = await letraDeUnTema(this.name)
        this.lyrics = letra.lyrics_body
    }

    
}