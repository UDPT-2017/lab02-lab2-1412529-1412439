
var model=require("../models")
var usersController = {
    index: function (req, res) {
        res.render('users/users', {
            title: 'Users',
            message: 'Users',
        });
    },
add_friend:function(req,res){
model.user_model.add_friend(req,res);
},
un_friend:function(req,res){
model.user_model.un_friend(req,res);
},
};

module.exports = usersController;
