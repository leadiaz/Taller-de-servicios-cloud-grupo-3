const express = require('express');
const app = express();
const api = express.Router();
const MonitorController = require('./MonitorController')


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);

app.get('/api/stateServices',MonitorController.stateSerivices)
app.post('/api/chatMessage',MonitorController.stateSerivices)

app.set('json spaces',2);
const PORT = process.env.PORT || 9000;

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});