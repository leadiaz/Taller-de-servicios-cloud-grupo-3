export class  TrackExistsInAlbumError extends Error{
    constructor(public trackName: string){
        super("Ya existe un track con este nombre "+trackName)
        this.name = "TrackExistsInAlbumError"
    }
}
export class TrackExcepcion extends Error{
    constructor(trackName:string){
        super("No existe el track con este id: "+ trackName)
        this.name = "TrackError"
    }
}