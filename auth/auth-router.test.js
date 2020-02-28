const request = require('supertest');

const router = require('./auth-router.js');
const server = require('../api/server')

describe('login seems to be doing good stuff', () => {
    it('should login, given proper credentials', async () => {
         const response = await (request(server).post('/api/auth/login').send({ username: 'BrianHague', password: 'pass' }).then(res => {
            expect(res.status).toBe(200)
        }))
    })
    it('should not login, given improper credentials', () => {
        return(request(server).post('/api/auth/login').send({ username: 'jsdbjf', password: 'pass' }).then(res => {
            expect(res.status).toBe(500)
        }))
    })
})

describe('register seems to be doing good stuff', () => {
    it('should register, given proper credentials', () => {
        return(request(server).post('/api/auth/register').send({ username: `${Math.random()}`, password: 'pass' }).then(res => {
            expect(res.status).toBe(201)
        }))
    })
    it('should not register, given taken credentials', () => {
        return(request(server).post('/api/auth/register').send({ username: 'Brianague', password: 'pass' }).then(res => {
            expect(res.status).toBe(500)
        }))
    })
})