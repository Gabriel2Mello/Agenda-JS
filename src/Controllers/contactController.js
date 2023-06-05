const Contact = require('../Models/contactModel');

exports.index = (req, res) => {
    res.render('contact');
};

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();
    
        if(contact.hasError) {
            req.flash('errors', contact.errors);
            req.session.save(() => res.redirect('/contact'));
            return;
        }
    
        req.flash('success', 'Contact added with success!');
        req.session.save(() => res.redirect('/'));
        return;
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
};