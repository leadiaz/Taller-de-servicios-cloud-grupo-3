export class  TrackExistsInAlbumError extends Error{
    constructor(public trackName: string){
        super("Ya existe un track con este nombre "+trackName)
        this.name = "TrackExistsInAlbumError"
    }
}
export class TrackExcepcion extends Error{
    constructor(){
        super("No existe el track")
        this.name = "TrackExcepcion"
    }
}