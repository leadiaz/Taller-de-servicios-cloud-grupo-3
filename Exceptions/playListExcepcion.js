class NotExistPlayListError extends Error {
    constructor(playListName){
        super('No existe el playList' + playListName);
        this.name ='NotExistPlayListError';
    }
}

module.exports = {
    NotExistPlayListError
};