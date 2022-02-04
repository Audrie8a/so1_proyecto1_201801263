const usariosRouter = require('./routes/routesMongo');



const express = require('express');
const morgan=require('morgan');
const bodyParser = require('body-parser');


// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
const cors = require('cors')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())



app.get('/', (req, res) => {
  res.send('Hello World');
});



app.use("/usuarios", usariosRouter)

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);