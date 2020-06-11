import { IdGenerator } from "./idGenerator"
import{letraDeUnTema} from "./musixMatch"


export class Track{
    id;
    constructor(
        public idAlbum?: Number,
        public name?: String,
        public duration?:Number,
        public genres?: Array<String>,
        public lyrics?: String,
    ){
        this.id = IdGenerator.getNextId();
    }
    toJSON(){
        return {idAlbum: this.idAlbum,id: this.id, name: this.name, duration: this.duration, genres: this.genres}
    }

    //Dado un array de Genres retorna true si el track contiene algun genre 
    anyGenre(genres){
        return genres.some(genre => {return this.genres.includes(genre)})
    }


    getLyrics(){
        if(this.lyrics == null){
           //letraDeUnTema(this.name).then((lyrics)=>  this.setLyrics(lyrics))
           //console.log(this.lyrics) como trabaja con promesas y eso lo hace de forma asincrona, primero hace el return y luego la letraDeUnTema, o sea siempre me denota undefined 
           return this.lyrics
        }else{
           return this.lyrics
        }
    
    }

    setLyrics(lyrics) {
        this.lyrics = lyrics
       //console.log(this.lyrics)
    }
    
}