const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;
const todo = require("./Todo");

/* 
 * Setting middleware for express
 * bodyParser.json -> decode the json valus from incoming request body
 * express.static -> to server static file like html, js, css, images
 * adding todo router
 */
app.use(bodyParser.json());
app.use('/dist', express.static('./dist'));
app.use('/client', express.static('./client'));
app.use("/", todo);



/*
 * Server index.html when root context requested
 */
app.get('/', (req, res)=> {
    res.sendFile(path.resolve('client/index.html'));
});

/*
 * Handle the unhandled exception to prevevnt node server getting terminated.
 */
process.on('uncaughtException', (error) => {
  console.log('Caught unhandled exception: ' + error);
});

/*
 * Start server and listen port
 */
app.listen(PORT, () => {
    console.log('App listening on port', PORT);
});
