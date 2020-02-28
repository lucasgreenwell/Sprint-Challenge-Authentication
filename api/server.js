const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
    name: 'bikini',
    secret: 'super secret',
    cookie: {
        maxAge: 1000 * 3600 * 24, //one day in milliseconds
        secure: false, //needs to be true in production
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true //needs to be false in production for gdpr compliance, illegal to set cookies automatically
}
server.use(session(sessionConfig))


server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
