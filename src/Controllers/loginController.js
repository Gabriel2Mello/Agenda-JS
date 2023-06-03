const Login = require('../Models/LoginModel')

exports.index = (req, res) => {    
    if(req.session.user) return res.render('login-logged');
    return res.render('login');
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

        req.flash('success', 'Account created with success!');
        req.session.save(function() {
            return res.redirect('/login');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.login = async function(req, res) {
    try {                
        const login = new Login(req.body);
        await login.login();
    
        if(login.hasError){
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('/login');
            });
            return;
        }

        req.flash('success', 'Welcome back!');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/login');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};

exports.logout = function(req, res) {
    req.session.destroy();     
    res.redirect('/');
}