

var usersController = {
    index: function (req, res) {
        res.render('users/users', {
            title: 'Users',
            message: 'Users',
        });
    },

};

module.exports = usersController;