import {AlbumExistsInArtistError, NotExistAlbumError} from "../Exceptions/albumException";

export class Artist{
    albums:Album[]

    constructor(
        public id?:Number,
        public name?:String,
        public country?:String,
    ){
        this.id = IdGenerator.getNextId()
        this.albums = []
    }
    toJSON(){
        return {id: this.id, name: this.name, country:this.country, albums: this.albums }
    }
    addAlbum(album){
        // if(this.existeAlbum(albumData.name)){
        //     throw new AlbumExistsInArtistError(albumData.name)

        // }else{
          
            this.albums.push(album)
    }
    
    getTracks():Track[]{
        return this.albums.reduce((accumulator, album) => {return accumulator.concat(album.tracks)}, [])  
    }
    removeAlbum(anAlbum){
        const album = this.albums.find(album => album.id === anAlbum.id)
        if(!album){
            throw new NotExistAlbumError(anAlbum.name)
        }else {
            let index = this.albums.indexOf(album)
            album.removeTracks()
            this.albums.splice(index, 1)
        }
    }
    removeAlbums() {
        this.albums.forEach(album => {
            album.removeTracks()
        })
    }

    private existeAlbum(name: any) {
        return this.albums.some(album => {return album.name === name})
    }
}


import { Album } from "./album";
import { Track } from "./track";
import { IdGenerator } from "./idGenerator";