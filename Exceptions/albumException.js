class  AlbumExistsInArtistError extends Error{
    constructor(albumName){
        super("El album "+albumName+" ya existe en este artista")
        this.name = "AlbumExistsInArtistError"
    }
}
class NotExistAlbumError extends Error{
    constructor(albumName){
        super("No existe el album "+albumName)
        this.name = 'NotExistAlbumError'
    }
}

module.exports = {
    AlbumExistsInArtistError,
    NotExistAlbumError
}