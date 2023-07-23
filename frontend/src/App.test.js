import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../src/App';

// Mocking Axios requests
const mockAxios = new MockAdapter(axios);

describe('Forum App', () => {
    beforeEach(() => {
        // Reset mock adapter before each test
        mockAxios.reset();
    });

    it('should register a new user and login', async () => {
        // Mock successful registration response
        mockAxios.onPost('/api/register').reply(200, { message: 'Registration successful' });

        // Render the app
        render(<App />);

        // Navigate to the registration page
        fireEvent.click(screen.getByText('Register'));

        // Fill in the registration form
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Register'));

        // Assert that the registration was successful
        await waitFor(() => expect(screen.getByText('Registration successful')).toBeInTheDocument());

        // Mock successful login response
        mockAxios.onPost('/api/login').reply(200, { message: 'Login successful' });

        // Fill in the login form
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));

        // Assert that the login was successful
        await waitFor(() => expect(screen.getByText('Login successful')).toBeInTheDocument());
    });

    it('should create a new forum post and display it', async () => {
        // Mock successful forum post creation response
        mockAxios.onPost('/api/posts').reply(200, { id: 'post123', title: 'Test Post', content: 'Lorem ipsum' });

        // Render the app
        render(<App />);

        // Log in as a user
        fireEvent.click(screen.getByText('Login'));
        fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Login'));

        // Create a new forum post
        fireEvent.click(screen.getByText('Create Post'));
        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Post' } });
        fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Lorem ipsum' } });
        fireEvent.click(screen.getByText('Submit'));

        // Assert that the forum post is displayed
        await waitFor(() => expect(screen.getByText('Test Post')).toBeInTheDocument());
        expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
    });

    it('should add a comment to a forum post', async () => {
        // Mock successful forum post retrieval response
        mockAxios.onGet('/api/posts/post123').reply(200, {
            id: 'post123',
            title: 'Test Post',
            content: 'Lorem ipsum',
            comments: [],
        });

        // Mock successful comment creation response
        mockAxios.onPost('/api/posts/post123/comments').reply(200, { id: 'comment456', text: 'Comment text', author: 'testuser' });

        // Render the app
        render(<App />);

        // View a forum post
        fireEvent.click(screen.getByText('View Post'));
        fireEvent.click(screen.getByText('Test Post'));

        // Add a comment to the forum post
        fireEvent.change(screen.getByLabelText('Add a comment'), { target: { value: 'Comment text' } });
        fireEvent.click(screen.getByText('Submit'));

        // Assert that the comment is displayed
        await waitFor(() => expect(screen.getByText('Comment text')).toBeInTheDocument());
        expect(screen.getByText('By: testuser')).toBeInTheDocument();
    });

    // Add more tests for other functionalities (update post, delete post, etc.) following a similar pattern.
});


// EventForm.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventForm from '../components/EventForm';

// Mock fetch function
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({}),
}));

beforeEach(() => {
    fetch.mockClear();
});

test('EventForm submits the form correctly', async () => {
    render(<EventForm />);

    // Fill out the form
    userEvent.type(screen.getByPlaceholderText('Title'), 'Test Event');
    userEvent.type(screen.getByPlaceholderText('Description'), 'This is a test event');

    // Submit the form
    fireEvent.click(screen.getByText('Create Event'));

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/events', {
            method: 'POST',
            body: JSON.stringify({
                title: 'Test Event',
                description: 'This is a test event',
                startDate: expect.anything(),
                endDate: expect.anything(),
                user_id: expect.anything(),
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': expect.stringMatching(/^Bearer /),
            },
        });
    });
});

// EventPreview.test.js
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EventPreview from '../components/EventPreview';

// Mock fetch function
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({}),
}));

beforeEach(() => {
    fetch.mockClear();
});

test('EventPreview handles delete correctly', async () => {
    const event = { // mock event object
        _id: 'testId',
        user_id: 'testUser',
        title: 'Test Event',
        description: 'This is a test event',
        startDate: new Date(),
        endDate: new Date(),
        createdAt: new Date(),
    };
    render(<EventPreview event={event} />);

    // Click the 'Delete' button
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/events/testId', {
            method: 'DELETE',
            headers: {
                'Authorization': expect.stringMatching(/^Bearer /),
            },
        });
    });
});

