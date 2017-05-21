
var model=require("../models")
var homeController = {

    login:false,
    index: function (req, res) {
      console.log(req);
        res.render('home/index', {
            title: 'Home',
            message: 'Home',
        });
    },

    home: function (req, res) {

        res.render('home/index', {
            title: 'Home',
            message: 'Home',
        }

        );
    },
    load_user:function(req,res){
      model.user_model.load_user(req,res);
    },
    auth: function(req, res, next) {
      if (req.session && req.session.user)
        return next();
      else
        return res.sendStatus(401);
    },
  logout: function (req, res) {
      req.session.destroy();
      res.send("logout success!");
    },
    register:function(req, res){
      model.user_model.register(req,res);
    },
    login:function(req,res){
      model.user_model.login(req,res);

    },
    check_login:function(req,res){
    if(req.session.user){
      res.send("1");
    }
    else{
      res.send("0");
    }
  }
}

module.exports = homeController;
