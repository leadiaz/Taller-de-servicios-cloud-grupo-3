const express = require('express');
const app = express();
const api = express.Router();
const ControllerMonitor = require('./MonitorController')

app.set('json spaces',2);
const PORT = process.env.PORT || 9000;

api.post('/api/monitor/activar',ControllerMonitor.activarMonitoreo)
api.post('/api/monitor/desactivar',ControllerMonitor.desactivarMonitoreo)
api.get('/api/monitor/estadoServidores',ControllerMonitor.estadoDeServidores)

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);