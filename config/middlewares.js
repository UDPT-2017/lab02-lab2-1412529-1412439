var express = require('express');

module.exports = function (app) {
    app.use(express.static('public'));
    app.use('/components', express.static('bower_components'));
    app.use('/app', express.static('app'));
}
