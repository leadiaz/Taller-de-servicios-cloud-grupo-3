export class ArtistExistsWithThatName extends Error{
    constructor(nameArtist: string){
        super("Ya existe un artista con el nombre de " + nameArtist)
        this.name = "ArtistExistsWithThatName"
    }
    
}
export class ArtistExcepcion extends Error{
    constructor(nameArtist: string){
        super("No existe el artista con este id: " +nameArtist)
        this.name = "ArtistError"
    }
}