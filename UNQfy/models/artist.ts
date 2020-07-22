/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {AlbumExistsInArtistError, NotExistAlbumError} from "../Exceptions/albumException";
const Notificador = require('../../Notification/notificador');
import { Observable } from "./observable";

const notificador = new Notificador.Notificador()

export class Artist  {
    albums:Album[];
    id: number;
    observers:any[];

    constructor(
        public name?:string,
        public country?:string,
    ){
        this.id = IdGenerator.getNextId();
        this.albums = [];
        this.observers = [notificador];
    }
    toJSON(){
        return {id: this.id, name: this.name, country:this.country, albums: this.albums };
    }
    addAlbum(album: Album){
        if(this.existeAlbum(album.name)){
             throw new AlbumExistsInArtistError(album.name);

        }else{
            this.albums.push(album);
            this.notify(album);
          }
    }
    notify(album){
        this.observers.forEach( observer => {
            observer.update(this, album)
        })
    }
    
    getTracks():Track[]{
        return this.albums.reduce((accumulator, album) => {return accumulator.concat(album.tracks)}, []);
    }
    removeAlbum(anAlbum){
        const album = this.albums.find(album => album.id === anAlbum.id);
        if(!album){
            throw new NotExistAlbumError(anAlbum.name);
        }else {
            const index = this.albums.indexOf(album);
            album.removeTracks();
            this.albums.splice(index, 1);
        }
    }
    removeAlbums() {
        this.albums.forEach(album => {
            album.removeTracks();
        });
        this.albums = [];
    }

    private existeAlbum(name: any) {
        return this.albums.some(album => {return album.name === name});
    }
    update(body){
        this.name = body.name;
        this.country = body.country;
    }
}


import { Album } from "./album";
import { Track } from "./track";
import { IdGenerator } from "./idGenerator";


