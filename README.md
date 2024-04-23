# Storyblog

A website where people from all around the world may share blogs and articles and tell stories.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Storyblog offers a platform for self-expression, social interaction, and the exploration of various tales. Stories in a variety of genres and themes can be created, published, and discovered by users.

## Features

- User authentication and authorization
- CRUD operations on blog posts
- Search and filtering functionality
- Responsive design for mobile and desktop

## Technologies

- **Backend:**
  - Python
  - Flask
  - PostgreSQL

- **Frontend:**
  - JavaScript
  - React
  - HTML5/CSS3

## Getting Started

To get started with Storyblog, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/RoshanJaishi/storyblog
   ```

2. **Set up the backend:**
   - Navigate to the `backend` directory.
   - Create and activate a virtual environment:
     ```
     python -m venv env
     ```
     ```
     source env/bin/activate  # for macOS and Linux
     ```
     ```
     .\env\Scripts\activate  # for Windows
     ```
   - Install backend dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Set up a PostgreSQL database and update the connection URI in the Flask application configuration.

3. **Set up the frontend:**
   - Navigate to the `frontend` directory.
   - Install frontend dependencies:
     ```
     npm install
     ```

4. **Run the application:**
   - Start the backend server:
     ```
     python app.py
     ```
   - Start the frontend development server:
     ```
     npm start
     ```

5. **Access the application:**
   Open a web browser and navigate to `http://localhost:3000`.

## Usage

- Register as a new user or log in with existing credentials.
- Create, edit, or delete blog posts.
- Browse and search for posts by category or keyword.
- Interact with other users' posts by liking, commenting, and sharing.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to submit pull requests or open issues.

## License

This project is licensed under the [MIT License](LICENSE).
```
