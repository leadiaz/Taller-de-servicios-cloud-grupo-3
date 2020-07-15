const error = require('../UNQfy/Exceptions/excepcionesAPI');
const Notifier = require('../Notification/notificador');
const notificador = new Notifier.Notificador();

function subscribe(req, res) {
    const body = req.body;
    if (!(body.artistId && body.email)) {
        throw new error.JSONException();
    }
    notificador.suscribirseAUnArtista(body.artistId, body.email).then(() => {
        res.json({message: 'suscripción éxitosa'});
    }).catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function unsubscribe(req, res){
    const body = req.body;
    if(!(body.artistId && body.email)){
        throw new error.JSONException();
    }
    notificador.desubscribirseAUnArtista(body.artistId, body.email).then(()=>{
        res.json();
    }).catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function notify(req, res){
    const body = req.body;
    if(!(body.artistId && body.subject && body.message && body.from)){
        throw new error.JSONException();
    }
    notificador.notificarUsuarios(body).then(()=>{
        res.json('OK!');
    }).catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function getSubscriptionsForArtist(req, res) {
    if(!(req.query.artistId)){
        throw new error.JSONException();
    }
    const artId = parseInt(req.query.artistId);
    notificador.getsEmails(artId).then((parIdEm)=>{
        res.json({
            artistId: parIdEm.idArtist,
            emails: parIdEm.emailsUsers
        });
    }).catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}
function deleteSubscriptions(req, res) {
    const body = req.body;
    if(!body.artistId){
        throw new error.JSONException();
    }
    notificador.deleteEmails(body.artistId).then(()=>{
        res.json({message: 'OK!'});
    }).catch(() => {
        res.status(error.status);
        res.json({status: error.status, errorCode: error.errorCode});
    });
}

module.exports = {
    subscribe,
    unsubscribe,
    notify,
    getSubscriptionsForArtist,
    deleteSubscriptions
};
