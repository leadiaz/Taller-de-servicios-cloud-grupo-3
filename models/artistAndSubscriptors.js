export default class ArtistAndSubscriptors{
    constructor(id){
        this.idArtist = id;
        this.emailsUsers = [];
    }

    agregarEmail(emailsUser){
        if(!(this.emailsUsers.filter(e => e === emailsUser).length > 0)){ 
            this.emailsUsers.push(emailsUser);
        }
    }
}