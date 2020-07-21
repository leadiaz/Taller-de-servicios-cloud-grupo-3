
const express = require('express');
const app = express();
const api = express.Router();
const ERRORAPI  = require('../UNQfy/Exceptions/excepcionesAPI');
const errorHandler = require('../UNQfy/erroresApi/errors');

const NotificationController = require('./notificationController');
/** Notificador */
api.post('/api/subscribe', NotificationController.subscribe);
api.post('/api/unsubscribe', NotificationController.unsubscribe);
api.post('/api/notify', NotificationController.notify);
api.get('/api/subscriptions',NotificationController.getSubscriptionsForArtist);
api.delete('/api/subscription', NotificationController.deleteSubscriptions);
api.get('/api/state',function (req,res) {
    res.status(200)
    res.json({state: "Funcionando"})
})
api.all('*', (_req, res) => {
    throw new ERRORAPI.InvalidURL();
});



app.set('json spaces',2);
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});
