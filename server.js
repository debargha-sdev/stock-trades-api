const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const env = require('./env');
const cors = require('cors');
const http = require('http');
const path = require('path');

require('dotenv').config();

const config = global.config = require('./config')[env.mode || 'development'];

const PORT = config.port.http || 3200;
const NODE_ENV = env.mode || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);
app.set('secret', config.auth.secret);

// Database connect
require('./database').connect(true);

app.use(cors());
app.use(bodyParser.json());

// API Routes
// app.use('/', require('./routes'));

app.use('/index',express.static(path.join(__dirname,'./static/index.html')));
app.get('/', (req, res)=> {
    console.log('>>>>>>>>>>>>>>>>>',__dirname);
    res.sendFile("static/index.html")
})

const server = http.createServer(app);
const httpServer = server.listen(PORT, () => {
    console.log(`HTTP Server started on Port ${app.get('port')} | Environment : ${app.get('env')}`);
});

require('./utility/chat').initialize(httpServer);

module.exports = app;

