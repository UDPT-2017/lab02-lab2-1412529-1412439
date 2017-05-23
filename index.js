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
var port = 1000;
app.listen(process.env.PORT||3000);
app.post('/register',jsonParser,controllers.home.register);
app.post('/login',jsonParser,controllers.home.login);
app.post('/add_friend',jsonParser,controllers.users.add_friend);
app.post('/un_friend',jsonParser,controllers.users.un_friend);
app.post('/load_user',jsonParser,controllers.home.load_user);
app.post('/load_messages',jsonParser,controllers.messages.load_messages);
app.post('/update_message',jsonParser,controllers.messages.update_messages);
app.post('/send_messages',jsonParser,controllers.messages.send_messages);
app.get('/logout',controllers.home.logout);
app.get('/content',controllers.home.auth,function(req,res){
  res.send("see this if you log in sucess");
})
app.post('/check_login',jsonParser,controllers.home.check_login);
