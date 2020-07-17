const Notificador = require('../../Notification/notificador');
const notificador = new Notificador.Notificador()

export class Observable{
    observers: any[];
    constructor(){
        this.observers = [notificador]
    }
    notify(artista, album){
        this.observers.forEach( observer => {
            observer.update(artista, album)
        })
    }
}