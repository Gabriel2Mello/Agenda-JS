const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.hasError = false;
        this.user = null;
    }

    async register() {
        this.check();
        if(this.hasError) return;

        try {
            this.user = await LoginModel.create(this.body);    
        } catch (e) {
            console.log(e);
        }
    }

    check() {
        this.cleanUp();
        
        if(!validator.isEmail(this.body.email)) {
            this.hasError = true;
            this.errors.push('Email invalid.');
        };

        if(!isInRange(this.body.password, 3, 50)) {
            this.hasError = true;
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

module.exports = Login;