export class NotExistPlayListError extends Error {
    constructor(playListName: string){
        super('No existe el playList' + playListName)
        this.name ='NotExistPlayListError'
    }
}