'use strict';
// Modules
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes/index');

// Vars
let port = 5030;
let app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

routes(app);


app.listen(port, () => {
  console.log('Started in port ' + port);
});
