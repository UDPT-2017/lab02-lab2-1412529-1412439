

var messagesController = {
    index: function (req, res) {
        res.render('messages/messages', {
            title: 'Messages',
            message: 'Messages',
        });
    }
};

module.exports = messagesController;