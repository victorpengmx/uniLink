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
