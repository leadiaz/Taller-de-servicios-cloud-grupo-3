export class  AlbumExistsInArtistError extends Error{
    constructor(albumName: string){
        super("El album "+albumName+" ya existe en este artista")
        this.name = "AlbumExistsInArtistError"
    }
}
export class NotExistAlbumError extends Error{
    constructor(albumName:string){
        super("No existe el album "+albumName)
        this.name = 'NotExistAlbumError'
    }
}