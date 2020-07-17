const express = require('express');
const app = express();
const api = express.Router();
const LogglyController = require('./LogglyController')

app.set('json spaces',2);
const PORT = process.env.PORT || 9000;

api.post('/api/loggly/event',LogglyController.agregarEvento)
api.post('/api/loggly/activar',LogglyController.activarLoggly)
api.post('/api/loggly/desactivar',LogglyController.desactivarLoggly)
api.get('/api/loggly/state',LogglyController.stateLoggly)

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});
