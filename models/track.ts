export class Track{
    constructor(
        public id?: Number,
        public name?: String,
        public duration?:Number,
        public genres?: Array<String>
    ){
        this.genres = new Array()
    }
    toJSON(){
        return {id: this.id, name: this.name, duration: this.duration, genres: this.genres}
    }
    anyGenre(genres:Array<String>){
        return genres.some(genre => this.genres.includes(genre))
    }
}