

var aboutController = {
    index: function (req, res) {
        res.render('about/about', {
            title: 'About',
            message: 'About',
        });
    },

};

module.exports = aboutController;