const error = require('../Exceptions/excepcionesAPI');
const Notifier = require('../notificador');
const notificador = new Notifier.Notificador();

function subscribe(req, res) {
    const body = req.body;
    if (!(body.artistId && body.email)) {
        throw new error.JSONException();
    }
    notificador.suscribirseAUnArtista(body.artistId, body.email).then(() => {
        res.json();
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
        res.json();
    }).catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

function getSubscriptionsForArtist(req, res) {
    if(!(req.params.artistId)){
        throw new error.JSONException();
    }
    const artId = parseInt(req.params.artistId);
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
    const artId = parseInt(req.params.artistId);
    notificador.deleteEmails(artId).then(()=>{
        res.json();
    }).catch((error) => {
        if (error) {
            res.status(error.status);
            res.json({status: error.status, errorCode: error.errorCode});
        }
    });
}

module.exports = {
    subscribe,
    unsubscribe,
    notify,
    getSubscriptionsForArtist,
    deleteSubscriptions
};
