const Contact = require('../Models/contactModel');

exports.index = async (req, res) => {
    const contacts = await Contact.getAll();

    res.render('index', { contacts });
    return;
}