# uniLink

## Team Members
- Long Nguyen Tan
- Peng Victor

## Description

UniLink is a web application that allows users to connect and engage in discussions related to university topics. It provides a platform for students, professors, and university staff to share information, ask questions, and participate in forums.

## Features

- **User Authentication**: Users can create accounts, log in, and log out. This ensures that only authenticated users can create forum posts and comments.
- **Forum Posts**: Users can create, view, edit, and delete forum posts. Each post includes a title, content, and author information. Users can also view the comments associated with each post.
- **Commenting**: Users can comment on forum posts and engage in discussions. Comments are displayed under each forum post and provide a way for users to share their thoughts or ask questions.
- **Search Functionality**: Users can search for specific forum posts or topics. The search feature allows users to find relevant posts based on keywords or specific criteria.
- **User Profiles**: Each user has a profile page displaying their information and activity. Users can view their own profile and see the posts and comments they have made.
- **Responsive Design**: The application is optimized for various screen sizes and devices. It provides a seamless user experience across desktop, tablet, and mobile devices.

## Technologies Used

- **Frontend**: The frontend of the application is built using React, HTML, CSS, and JavaScript.
- **Backend**: The backend of the application is built using Node.js.
- **Database**: The application uses MongoDB as the database to store forum posts, comments, user information, and other relevant data.
- **Authentication**: User authentication is implemented using JSON Web Tokens (JWT). JWT allows for secure and stateless authentication by generating and verifying tokens.
- **State Management**: The application uses React Context API for state management.
- **Other Libraries and Tools**: Axios is used for making HTTP requests to the backend API. Bootstrap is used for styling and responsive design. Git is used for version control and collaborative development.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/longnguyentan/uniLink.git
2. Navigate to the project directory:
   ```bash
   cd uniLink
3. Install the dependencies:
   ```bash
   npm install
4. Set up the environment variables:
- Create a .env file in the root directory.
- Define the required environment variables (e.g., database connection string, JWT secret key).
5. Start the development server:
   ```bash
   npm start
6. Open your web browser and visit http://localhost:3000 to access the application.

## Usage Guide
To use the uniLink application, follow these steps:
1. Sign up for an account or log in if you already have one. 
2. Explore the existing forum posts or create a new post by clicking on the "New Post" button. 
3. Fill in the title and content of your post and click "Submit" to create it. 
4. View and engage with other users' posts by clicking on the post title. 
5. Leave comments on posts to participate in discussions. 
6. Use the search functionality to find specific posts or topics of interest. 
7. Update or delete your own posts as needed. 
8. View your profile to see your activity and posts. 
9. Log out when you're done using the application.

## API Documentation
The uniLink application provides the following API endpoints:

- `POST /api/auth/signup`: Create a new user account.
- `POST /api/auth/login`: Log in to an existing user account.
- `POST /api/auth/logout`: Log out of the current user session.
- `GET /api/posts`: Get all forum posts.
- `GET /api/posts/:postId`: Get a specific forum post by ID.
- `POST /api/posts`: Create a new forum post.
- `PUT /api/posts/:postId`: Update an existing forum post.
- `DELETE /api/posts/:postId`: Delete a forum post by ID.
- `POST /api/posts/:postId/comments`: Create a new comment on a forum post.
- `PUT /api/posts/:postId/comments/:commentId`: Update an existing comment.
- `DELETE /api/posts/:postId/comments/:commentId`: Delete a comment on a forum post.

Please refer to the API documentation for detailed information about the request/response formats, authentication/authorization requirements, and available options and parameters.

## Component Documentation
The uniLink application is built using React and follows a component-based architecture. The following are the main components used in the application:

1. App: The root component that sets up the application and manages the routing. 
2. Navbar: The navigation bar component that provides links to different sections of the application. 
3. LoginForm: The component for user login, including input fields for email and password. 
4. SignupForm: The component for user registration, including input fields for name, email, and password. 
5. PostList: The component that displays a list of forum posts. 
6. PostItem: The component that represents an individual forum post, including the post title, content, and author information. 
7. CommentList: The component that displays the comments for a forum post. 
8. CommentItem: The component that represents an individual comment, including the comment text and author information.

Please refer to the component documentation for detailed information about each component's purpose, props, and usage guidelines.

## Troubleshooting
If you encounter any issues or error messages while using the uniLink application, try the following troubleshooting steps:

1. Make sure you have correctly set up the environment variables in the .env file.
2. Check your network connection and ensure that the backend server is running.
3. Clear your browser cache and try refreshing the page.
4. If the issue persists, please open an issue on the project repository with detailed information about the problem you're facing.

## Configuration
The uniLink application provides several configuration options that can be customized. These options can be modified by updating the environment variables in the .env file. Here are some of the important configuration options:

- `REACT_APP_API_BASE_URL`: The base URL of the backend API.
- `REACT_APP_JWT_SECRET`: The secret key used for JWT authentication.
- `REACT_APP_ITEMS_PER_PAGE`: The number of items (forum posts/comments) to display per page.
- `REACT_APP_MAX_COMMENT_LENGTH`: The maximum length allowed for a comment.
Please refer to the **.env.example** file for a complete list of available configuration options and their default values.

## Deployment Guide
To deploy the uniLink application to different environments, follow these steps:

1. Set up the appropriate environment variables in the deployment environment (e.g., production database connection string, JWT secret key).
2. Build the frontend assets by running the following command:
```bash
npm run build
```
3. Configure the backend server to serve the built frontend assets and connect to the database.
4. Start the backend server in the deployment environment.
5. Access the deployed application using the appropriate URL.

Please note that the deployment process may vary depending on your hosting provider and server configuration. Make sure to follow the specific deployment instructions provided by your hosting platform.
