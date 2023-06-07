import validator from 'validator';

export default function Login(formClass) {
    this.form = document.querySelector(formClass);
}

Login.prototype.console = function() {
    console.log(this.form);
}

Login.prototype.init = function() {    
    this.events();
}

Login.prototype.events = function() {
    if(!this.form) return;
    
    this.form.addEventListener('submit', e => {
        e.preventDefault();
        this.validate(e);
    });
}

Login.prototype.validate = function(e) {
    const el = e.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');

    let hasError = false;
    if(!validator.isEmail(emailInput.value)) {
        alert('Email invalid.');
        hasError = true;
    }
    
    if(!isInRange(passwordInput.value)) {
        alert('Password need to have between 3 and 50 characters.');
        hasError = true;
    }

    if(!hasError) el.submit();
};

function isInRange(value, min = 3, max = 50) {
    const length = value.length;     
    return (length >= min && length <= max);
}