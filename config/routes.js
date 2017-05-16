
var Router = require('express').Router;
var controllers = require('../app/controllers');

module.exports = function (app) {
    var homeRoutes = Router()
        .get('/', controllers.home.index)
        .get('/home', controllers.home.home)

    var messagesRoutes = Router()
        .get('/', controllers.messages.index)

    var usersRoutes = Router()
        .get('/', controllers.users.index)

    var aboutRoutes = Router()
        .get('/', controllers.about.index)

    app.use('/', homeRoutes);
    app.use('/messages', messagesRoutes);
    app.use('/users', usersRoutes);
    app.use('/about', aboutRoutes);
}