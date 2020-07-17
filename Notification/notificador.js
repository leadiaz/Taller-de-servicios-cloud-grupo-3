/* eslint-disable eqeqeq */

const rp = require('request-promise');
const errors = require('../UNQfy/Exceptions/excepcionesAPI');
const ArtistNotFound = errors.RelatedResourceNotFound;
const URL = 'http://localhost:9000/api';
const ArtistAndSubscritors = require('./artistAndSubscriptors');

const ServerInternalError = errors.InternalServerError;
const getGmailClient = require('./gmailClient');
const gmailClient = getGmailClient();

class Notificador{
    
    constructor(){
        this.mapaDeSuscriptores = [];
    }
    update(artista, album){
        const options = {
            url: URL + '/notify',
            body: {
                artistId: artista.artistId,
                subject: 'Nuevo Album para el artista ' + artista.name,
                message: 'Se ha agregado el album ' + album.name + ' al artista ' + artista.name,
                from: 'pruebawebservices@gmail.com',
            },
            json: true,
        };
        rp.post(options).catch(() => {
            throw new ServerInternalError();
        }); 
        console.log(options.url);
    }
    crearMensaje(data, email){
        const subject = `${data.subject}`;
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            `From: ${data.from}`,
            `To: ${email}`,
            // 'To: leadiaz94@gmail.com',
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            `${data.message}`,
        ];
        const message = messageParts.join('\n');
        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
  
        return encodedMessage;
    }
    enviarMails(data, emailsUsers){
        const request = emailsUsers.map(email => {
            gmailClient.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: this.crearMensaje(data, email)
                }
            });
        });
        // eslint-disable-next-line no-undef
        return new Promise.all(request).catch(()=>{
            throw new ServerInternalError();
        });
    }
    /**
     * 
     * @param {artistId, subject,message, from} data 
     */
    notificarUsuarios(data){
        return this.verificarSiExisteArtista(data.artistId).then((artista)=> {
            const artist_emails = this.getsEmailsArtistIdFromMap(artista.id);
            this.enviarMails(data, artist_emails.emailsUsers);
        }).catch(() => {
            throw new ServerInternalError();
        });
    }
    getsEmailsArtistIdFromMap(artistid){
        let  parIdEm = this.mapaDeSuscriptores.find(pares=> pares.idArtist == artistid);
        if(!parIdEm){
            parIdEm = new ArtistAndSubscritors.ArtistAndSubscriptors(artistid);
            this.mapaDeSuscriptores.push(parIdEm);
        }
        return parIdEm;
    }
    
    getsEmails(artistID){
        return  this.verificarSiExisteArtista(artistID).then(()=> {
            return this.getsEmailsArtistIdFromMap(artistID);
        });
    }

    deleteEmails(artistID){
        return  this.verificarSiExisteArtista(artistID).then(()=> {
            this.getsEmailsArtistIdFromMap(artistID).deleteEmails();
        });
    }

    suscribirseAUnArtista(artistID,mailUsuario){
        return  this.verificarSiExisteArtista(artistID).then(()=> {
            this.getsEmailsArtistIdFromMap(artistID).agregarEmail(mailUsuario);
        });
    }

    desubscribirseAUnArtista(artistID,mailUsuario){
        return  this.verificarSiExisteArtista(artistID)
            .then(()=> {
                const map = this.getsEmailsArtistIdFromMap(artistID);
                map.sacarEmail(mailUsuario);
            });
    }

    verificarSiExisteArtista(artistId){
        const options = {
            url: URL + '/artists/'+artistId,
            // headers: {'User-Agent': 'Request-Promise'},
            json: true,
        };
        return rp.get(options).then((artist)=>{
            console.log(artist, 'en la promesa');
            return artist;
        }).catch(() => {
            throw new ArtistNotFound();
        }); 
    }
    
}

module.exports = {
    Notificador: Notificador
};