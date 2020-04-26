export class ArtistExistsWithThatName implements Error{
    constructor(public name: string,public message: string, public nameArtist: string){
 
    }
    
}