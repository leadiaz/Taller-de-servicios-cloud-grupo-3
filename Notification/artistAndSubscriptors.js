class ArtistAndSubscriptors{
    constructor(id){
        this.idArtist = id;
        this.emailsUsers = ['leadiaz94@gmail.com'];
    }

    agregarEmail(emailsUser){
        if(!this.emailsUsers.includes(email => email == emailsUser)){ 
            this.emailsUsers.push(emailsUser);
        }
    }
    sacarEmail(emailsUser){
        this.emailsUsers = this.emailsUsers.filter(mail => mail != emailsUser);
    }
    deleteEmails(){
        this.emailsUsers = [];
    }
}

module.exports = {
    ArtistAndSubscriptors
};