var express = require('express');
var app = express();
var treat = require('./routes/treats');
var path = require('path');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var connectionString = "postgres://localhost:5432/treats";

/*** Build out a module to manage our treats requests. ***/

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/treats', treat); // catch all requests to /treats and pass to treat module


app.get('/', function(req, res) {
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.use(express.static('./server/public'));

app.listen(port, function() {
  console.log('Server running on port: ', port);
});
