import {AlbumExistsInArtistError, NotExistAlbumError} from "../Exceptions/albumException";

export class Artist{

    constructor(
        public id?:Number,
        public name?:String,
        public country?:String,
        public albums?: Array<Album>
    ){
        this.id = IdGenerator.getNextId()
        this.albums = new Array()
    }
    toJSON(){
        return {id: this.id, name: this.name, country:this.country, albums: this.albums }
    }
    addAlbum(albumData){
        if(this.existeAlbum(albumData.name)){
            throw new AlbumExistsInArtistError(albumData.name)
        }else{
            const album = new Album()
            album.idArtist = this.id
            album.name = albumData.name
            album.year = albumData.year
            album.tracks = !albumData.tracks ? new Array<Track>(): albumData.tracks
            this.albums.push(album)
            return album
        }
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

