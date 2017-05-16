
var homeController = {
    index: function (req, res) {
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
    }
}

module.exports = homeController;
