const express = require('express');
const app = express();
const api = express.Router();
const LogglyController = require('./LogglyController')

app.set('json spaces',2);
const PORT = process.env.PORT || 9000;

api.post('/api/event',LogglyController.agregarEvento)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(api);

app.listen(PORT,()=>{
    console.log('Server on port ', PORT);
});
