var pg=require("pg");
//var controllers1=require("../controllers");
////////////////////////////////////////////
pg.defaults.ssl = true;
var express = require('express'),session = require('express-session'),app = express();
app.use(session({
secret: '2C44-4D44-WppQ38S',
resave: true,
saveUninitialized: true
}));
var controllers = require('./app/controllers');
require('./config')(app);
var bodyParser = require('body-parser')
// create application/json parser

var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//start
var port = 3000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
app.post('/register',jsonParser,controllers.home.register);
app.post('/login',jsonParser,controllers.home.login);
app.post('/add_friend',jsonParser,controllers.users.add_friend);
app.post('/un_friend',jsonParser,controllers.users.un_friend);
app.post('/load_user',jsonParser,controllers.home.load_user);
app.get('/logout',controllers.home.logout);
app.get('/content',controllers.home.auth,function(req,res){
  res.send("see this if you log in sucess");
})
app.post('/check_login',jsonParser,controllers.home.check_login);
