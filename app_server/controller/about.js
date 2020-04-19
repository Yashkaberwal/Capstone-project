const about = function (req, res) {
    res.render('about', {
        title: 'About my Site'
    });
};
const home = function (req, res) {
    console.log(req.session.test);
    if (req.session.test == null) {
        res.render('home', {
            sessionval: "empty"
        });
    } else {
        res.render('home', {
            sessionval: "emptyq"
        });
    }
};

module.exports = {
    about,
    home
};
