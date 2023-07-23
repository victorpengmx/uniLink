const request = require('supertest');
const app = require('../server'); // Your Express app
const Event = require('../models/eventModel');
const { setupDatabase, eventOneId, eventOne } = require('./fixtures/db');

beforeEach(setupDatabase); // Reset the database before each test

test('Should create a new event', async () => {
    const response = await request(app)
        .post('/api/events')
        .send({
            title: 'Test Event',
            description: 'This is a test event',
            startDate: '2023-07-30',
            endDate: '2023-07-31',
            user_id: '610d0178bca5fe1e586850da'
        })
        .expect(200);
    const event = await Event.findById(response.body._id);
    expect(event).not.toBeNull();
});

test('Should update an existing event', async () => {
    const response = await request(app)
        .put(`/api/events/${eventOneId}`)
        .send({
            title: 'Updated Test Event'
        })
        .expect(200);
    const event = await Event.findById(eventOneId);
    expect(event.title).toBe('Updated Test Event');
});

test('Should delete an event', async () => {
    await request(app)
        .delete(`/api/events/${eventOneId}`)
        .expect(200);
    const event = await Event.findById(eventOneId);
    expect(event).toBeNull();
});
