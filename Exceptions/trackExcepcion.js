class  TrackExistsInAlbumError extends Error{
    constructor(trackName){
    super("Ya existe un track con este nombre "+trackName)
    this.name = "TrackExistsInAlbumError"
}
}
class TrackExcepcion extends Error{
    constructor(){
        super("No existe el track")
        this.name = "TrackExcepcion"
    }
}

module.exports = {
    TrackExcepcion,
    TrackExistsInAlbumError
}