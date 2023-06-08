// npm start
// npm run dev
// Support to old browsers
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import ContactFieldsTest from './modules/ContactFieldsTest';

const login = new Login('.form-login');
const register = new Login('.form-register');
const contactFieldsTest = new ContactFieldsTest();

login.init();
register.init();
contactFieldsTest.init();


