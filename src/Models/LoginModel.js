const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];        
        this.user = null;
    }

    get hasError() {
        return this.errors.length > 0
    };

    async register() {
        this.checkFields();
        if(this.hasError) return;

        await this.emailExists();
        if(this.hasError) return;

        this.body.password = generateHash(this.body.password);
        try {            
            this.user = await LoginModel.create(this.body);
        } catch (e) {
            console.log(e);
        }
    }

    async emailExists() {
        const user = await LoginModel.findOne({ email: this.body.email });
        if(user) this.errors.push('Email already exists.');
    }

    checkFields() {
        this.cleanUp();
        
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('Email invalid.');
        };

        if(!isInRange(this.body.password, 3, 50)) {
            this.errors.push('Password need to have between 3 and 50 characters.');
        }
    }

    cleanUp() {
        for (const key in this.body) {            
            if(typeof(this.body[key]) !== 'string') {                
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

}

function isInRange(value, min, max) {
    const length = value.length;     
    return (length >= min && length <= max);
}

function generateHash(value) {
    const salt = bcryptjs.genSaltSync();              
    return bcryptjs.hashSync(value, salt);
}

module.exports = Login;