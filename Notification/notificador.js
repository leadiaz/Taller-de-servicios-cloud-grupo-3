/* eslint-disable eqeqeq */

const rp = require('request-promise');
const errors = require('./Exceptions/excepcionesAPI');
const ArtistNotFound = errors.RelatedResourceNotFound;
const URL = 'http://localhost:5000/api';
const ArtistAndSubscritors = require('./models/artistAndSubscriptors');

const ServerInternalError = errors.InternalServerError;
const getGmailClient = require('./gmailClient');
const gmailClient = getGmailClient();

class Notificador{
    
    constructor(){
        this.mapaDeSuscriptores = [];
    }
    crearMensaje(mailSubscriptor, artistName){
        const subject = `${artistName} agregó un nuevo album`;
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            'From: Leandro <leadiaz94@gmail.com>',
            `To: ${mailSubscriptor}`,
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            `Este mensaje es para avisarte que ${artistName} ha agregado un nuevo album`,
        ];
        const message = messageParts.join('\n');
        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
  
        return encodedMessage;
    }
    enviarMails(idArtist, emailsUsers){
        // return new Promise.all(emailsUsers).then(email => {
        //     gmailClient.users.messages.send(
        //         {
        //           userId: 'me',
        //           requestBody: {
        //             raw: this.crearMensaje(),
        //           },
        //         }
        //       );
        // })
    }
    notificarUsuarios(param){
        // return this.verificarSiExisteArtista(param.artistId).then((artista)=> {
        //     return this.getsEmailsArtistIdFromMap(artista.id);
        // }).then(result => {
        //     this.enviarMails(result.idArtist, result.emailsUsers);
        // }).catch(errors => {
        //     throw new ServerInternalError();
        // });
    }
    getsEmailsArtistIdFromMap(artistid){
        let  parIdEm = this.mapaDeSuscriptores.find(pares=> pares.idArtist === artistid);
        if(parIdEm === undefined){
            parIdEm = new ArtistAndSubscritors.ArtistAndSubscritors(artistid);
            this.mapaDeSuscriptores.push(parIdEm);
        }
        return parIdEm;
    }
    

    getsEmails(artistID){
 
        return  this.verificarSiExisteArtista(artistID)
            .then(()=> {
                return this.getsEmailsArtistIdFromMap(artistID);
            });
    }

    deleteEmails(artistID){
        return  this.verificarSiExisteArtista(artistID).then(()=> {
            this.getsEmailsArtistIdFromMap(artistID).setearEmails([]);
            return true;});
    }

    suscribirseAUnArtista(artistID,mailUsuario){
        return  this.verificarSiExisteArtista(artistID).then(()=> {
            this.getsEmailsArtistIdFromMap(artistID).agregarEmail(mailUsuario);
            console.log(this.mapaDeSuscriptores);
            return true;});
    }

    desubscribirseAUnArtista(artistID,mailUsuario){
        return  this.verificarSiExisteArtista(artistID)
            .then(()=> {
                this.getsEmailsArtistIdFromMap(artistID).sacarEmail(mailUsuario);
                console.log(this.mapaDeSuscriptores);
                return true;
            });
    }

    eliminarArtistSuscribe(artistName){
        try {
            const artista = this.unquiFy.getArtistByName(artistName);
            this.mapaDeSuscriptores= this.mapaDeSuscriptores.filter((pares) => pares.idArtist != artista.artistId);
        } catch (error) {
            throw error;
        }
    }

    verificarSiExisteArtista(artistId){
        const options = {
            url: URL + '/artists/'+artistId,
            json: true,
        };
        return rp.get(options).then((artist)=>{
            return artist;
        }).catch((error) => {
            if (error) {
                console.log('Error ' + error.message);
                throw new ArtistNotFound();
            }
        }); 
    }
    
}

module.exports = {
    Notificador: Notificador
};