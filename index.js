var express = require('express');
var app = express();
require('./config')(app);

//start
var port = 3000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});