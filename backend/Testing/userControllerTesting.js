const request = require('supertest');
const app = require('../server'); // Your Express app
const User = require('../models/userModel');
const { setupDatabase, userOneId, userOne } = require('./fixtures/db');

beforeEach(setupDatabase); // Reset the database before each test

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            email: 'test@example.com',
            password: 'mypassword'
        })
        .expect(201);
    const user = await User.findById(response.body._id);
    expect(user).not.toBeNull();
});

test('Should login an existing user', async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);
    expect(response.body.token).not.toBeNull();
});
