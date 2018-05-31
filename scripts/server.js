const express = require('express');
const app = express();
const cache = require('memory-cache')
const constants = require('../public/js/constants')
const fetch = require('node-fetch')

/* starts an instance of a node server for the back end it is not used regulary but start as needed*/
app.set('port', (process.env.PORT || 8001));
url= constants.REST_URL + "/info";
global.myInfo = {};
url= constants.REST_URL + "/info"
fetch(url).then(response => {response.json().then( data => {global.myInfo = data});})

app.get('/info', function (req, res) {
    res.json(global.myInfo)
  })


app.listen(app.get('port'), () => {
    console.log(`The backend is running at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
  });