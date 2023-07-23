const request = require('supertest');
const app = require('../server'); // Your Express app
const ForumPost = require('../models/forumpostModel');
const { setupDatabase, postOneId, postOne } = require('./fixtures/db');

beforeEach(setupDatabase); // Reset the database before each test

test('Should create a new forum post', async () => {
    const response = await request(app)
        .post('/api/posts')
        .send({
            title: 'Test Post',
            content: 'This is a test post',
            user_id: '610d0178bca5fe1e586850da'
        })
        .expect(200);
    const post = await ForumPost.findById(response.body._id);
    expect(post).not.toBeNull();
});

test('Should update an existing forum post', async () => {
    const response = await request(app)
        .put(`/api/posts/${postOneId}`)
        .send({
            title: 'Updated Test Post'
        })
        .expect(200);
    const post = await ForumPost.findById(postOneId);
    expect(post.title).toBe('Updated Test Post');
});

test('Should delete a forum post', async () => {
    await request(app)
        .delete(`/api/posts/${postOneId}`)
        .expect(200);
    const post = await ForumPost.findById(postOneId);
    expect(post).toBeNull();
});
