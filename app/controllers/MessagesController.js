var model=require("../models")

var messagesController = {
    index: function (req, res) {
        res.render('messages/messages', {
            title: 'Messages',
            message: 'Messages',
        });
    },
    load_messages: function(req,res){
      model.messagesmodel.load_messages(req,res);
    },
    update_messages: function(req,res){
      model.messagesmodel.update_messages(req,res);
    },
    send_messages: function(req,res){
      model.messagesmodel.send_messages(req,res);
    },
};

module.exports = messagesController;
