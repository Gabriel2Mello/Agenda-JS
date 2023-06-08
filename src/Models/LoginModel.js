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

    async login() {        
        this.checkFields();
        if(this.hasError) return;

        await this.emailExistsLogin();
        if(this.hasError) return;
        
        this.comparePassword();
        if(this.hasError) return;
    }

    async emailExistsLogin() {
        await this.findEmail();
        if(!this.user) this.errors.push(`Email doesn't exist.`);
    }

    comparePassword() {
        const isEqual = bcryptjs.compareSync(this.body.password, this.user.password);
        if(isEqual) return isEqual;
        this.errors.push('Password invalid.');
        this.user = null;
        return;
    }

    async register() {
        this.checkFields();
        if(this.hasError) return;

        await this.emailExistsRegister();
        if(this.hasError) return;

        this.body.password = generateHash(this.body.password);        
        this.user = await LoginModel.create(this.body);
    }

    async emailExistsRegister() {  
        await this.findEmail();
        if(this.user) this.errors.push('Email already exists.');
    }

    async findEmail() {
        this.user = await LoginModel.findOne({ email: this.body.email });
    }

    checkFields() {        
        this.cleanUp();
        
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('Email invalid.');
        };

        if(!validator.isLength(this.body.password, { min: 3, max: 50 })) {
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

function generateHash(value) {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(value, salt);
}

module.exports = Login;