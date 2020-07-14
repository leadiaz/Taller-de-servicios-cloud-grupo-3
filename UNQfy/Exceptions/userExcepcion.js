class NoExistUserError extends Error {
    constructor(userName){
        super('No existe el user con name' + userName);
        this.name = 'NoExistUserError';
    }


}

class ExistsUserError extends Error {
    constructor(userName){
        super('Ya existe el user con name' + userName);
        this.name = 'ExistsUserError';
    }
}

module.exports = {
    NoExistUserError,
    ExistsUserError
};