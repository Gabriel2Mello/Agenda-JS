// npm start
// npm run dev
require('dotenv').config();
const express = require('express');
const app = express();
// DB Connection
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database connected!');
        app.emit('done');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoScore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/Middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const maxAgeInDays = (days) => 1000 * 60 * 60 * 24 * days;
const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: MongoScore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: maxAgeInDays(7),
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'Views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('done', () => {
    app.listen(3000, () => {
        console.log('Server executing...');
        console.log('Access: http://localhost:3000');
    });
});