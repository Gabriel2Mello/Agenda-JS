const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    email: { type: String, required: false, default: '' },
    name: { type: String, required: true},
    lastName: { type: String, required: false, default: '' },
    number: { type: String, required: false, default: '' },
    createdAt: { type: Date, required: true, default: Date.now }
});

const ContactModel = mongoose.model('contact', contactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

Contact.prototype = {
    get hasError() {
        return this.errors.length > 0
    }
}

Contact.prototype.register = async function() {
    this.checkFields();
    if(this.hasError) return;

    this.contact = await ContactModel.create(this.body);
}

Contact.prototype.checkFields = function () {        
    this.cleanUp();
        
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Email invalid.');

    if(!this.body.name) this.errors.push('Name is required.');

    if(!this.body.email && !this.body.number) {
        this.errors.push('Contact needs a number or an email.');
    }
}


Contact.prototype.cleanUp = function () {
    for (const key in this.body) {            
        if(typeof(this.body[key]) !== 'string') {                
            this.body[key] = '';
        }
    }

    this.body = {
        email: this.body.email,
        name: this.body.name,
        lastName: this.body.lastName,
        number: this.body.number
    };
}

module.exports = Contact;