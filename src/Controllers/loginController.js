const Login = require('../Models/LoginModel')

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async function(req, res) {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.hasError){
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login');
            });
            return;
        }

        req.flash('success', 'User created with success!');
        req.session.save(function() {
            return res.redirect('/login');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }    
};