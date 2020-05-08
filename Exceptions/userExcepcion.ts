export class NoExistUserError extends Error {
    constructor(userName: string){
        super('No existe el user con name' + userName)
        this.name = 'NoExistUserError'
    }

   
}

export class ExistsUserError extends Error {
    constructor(userName: string){
        super('Ya existe el user con name' + userName)
        this.name = 'ExistsUserError'
    }
}