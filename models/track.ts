import { IdGenerator } from "./idGenerator"

export class Track{
    genres?:string[]
    constructor(
        public idAlbum?: Number,
        public id?: Number,
        public name?: String,
        public duration?:Number,
        
    ){
        this.id = IdGenerator.getNextId()
        this.genres =[]
    }
    toJSON(){
        return {idAlbum: this.idAlbum,id: this.id, name: this.name, duration: this.duration, genres: this.genres}
    }

    //Dado un array de Genres retorna true si el track contiene algun genre 
    anyGenre(genres){
        return genres.some(genre => {return this.genres.includes(genre)})
    }

    addGenre(genre:string){
       this.genres.push(genre)
    }
    
}