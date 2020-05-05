export class Track{
    constructor(
        public idAlbum?: Number,
        public id?: Number,
        public name?: String,
        public duration?:Number,
        public genres?: Array<String>
    ){
        this.genres = new Array()
    }
    toJSON(){
        return {idAlbum: this.idAlbum,id: this.id, name: this.name, duration: this.duration, genres: this.genres}
    }
    anyGenre(genres:Array<String>){
        return genres.some(genre => {return this.genres.includes(genre)})
    }
}