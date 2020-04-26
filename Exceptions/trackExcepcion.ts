export class  TrackExistsInAlbumError implements Error{
    constructor(public name: string,public message: string, public trackName: string){
 
    }
}