export class  TrackExistsInAlbumError extends Error{
    constructor(public trackName: string){
        super("Ya existe un track con este nombre "+trackName)
        this.name = "TrackExistsInAlbumError"
    }
}