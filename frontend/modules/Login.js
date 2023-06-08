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
    
    this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.validate(e);
    });
}

Login.prototype.validate = function(e) {
    this.clearErrors();
    const { target } = e;
    const { email, password } = target.elements;
    let hasError = false;

    if(!validator.isEmail(email.value)) {
        this.createError(email, 'Email invalid.');
        hasError = true;
    }
    
    if(!validator.isLength(password.value, { min: 3, max: 50 })) {
        this.createError(password, 'Between 3 and 50 characters.');
        hasError = true;
    }

    if(!hasError) target.submit();
};

Login.prototype.clearErrors = function() {
    this.form.querySelectorAll('.alert-danger').forEach((el) => el.remove());
}

Login.prototype.createError = function(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;    
    div.classList.add('alert-danger');    

    field.insertAdjacentElement('afterend', div);
}