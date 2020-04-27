
export class Artist{

    constructor(
        public id?:Number,
        public name?:String,
        public country?:String,
        public albums?: Array<Album>
    ){
        this.albums = new Array()
    }
    toJSON(){
        return {id: this.id, name: this.name, country:this.country, albums: this.albums }
    }
    addAlbum(anAlbum:Album){
        this.albums.push(anAlbum)
    }
    getTracks():Track[]{
        return this.albums.reduce((accumulator, album) => {return accumulator.concat(album.tracks)}, [])  
    }
}


import { Album } from "./album";
import { Track } from "./track"
