import axios from 'axios';

function ContactFieldsTest() {
    this.contactFields = document.querySelectorAll('.contact-field');  
    this.buttonContainer = document.querySelector('.button-test-container');
    this.data = null;
}

ContactFieldsTest.prototype.init = function() {
    this.events();
}

ContactFieldsTest.prototype.events = function() {
    if(!this.buttonContainer) return;
    
    this.buttonContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('test-button')){            
            this.fulfill(e);
        }
    });
}

ContactFieldsTest.prototype.fulfill = async function(e) {
    if(!this.data) {
        await this.loadElements(); 
    }
    
    const { target } = e;
    const testNumber = Number(target.name) - 1;    
    for (const element of this.contactFields) {     
        element.value = this.data[testNumber][element.name];
    }
    return;
}

ContactFieldsTest.prototype.loadElements = async function() {     
    try {
        const response = await axios('Tests/contacts.json');
        this.data = response.data;
    } catch (e) {
        console.log(e);
    }
}

export default ContactFieldsTest;