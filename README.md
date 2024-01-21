# Authentication-System

A full stack authentication system with a React frontend and Node.js API. Users can log in and sign up in the application. A simple profile page displays User details. User Authentication is done using JSON Web Tokens (JWT). User data is stored securely in a MySQL database.

<!-- ## Video Demo

Click on the image below to watch the demo video on Youtube. ⬇
[![Watch the video](https://img.youtube.com/vi/tS2S6GHAja0/0.jpg)](https://youtu.be/tS2S6GHAja0)

## Live Website

To see the app in action, check out the live demo [here](https://chat-app-flame-three.vercel.app/).

The API and Socket Server is deployed on Render.
The Frontend is deployed on Vercel. -->

## Features
- User registration
- JWT-based authentication
- Secure password storage using bcrypt
- Responsive UI designed with Chakra UI
- MySQL database with Sequelize ORM

## Installation

To set up the auth system locally, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/PiXeL99-eng/Authentication-System.git
cd Authentication-System
```

2. Install the required dependencies for the frontend:

```bash
cd frontend
npm install
```

3. Install the required dependencies for the API:

```bash
cd ../api
npm install
```

4. Configure MySQL and Generate a Secret Key for the API:

    Make sure you have MySQL installed and running on your machine.
    Create a .env file in the api directory and provide the necessary environment variables:

```bash
SECRET_KEY = any_secret_key_to_sign_JWT
DATABASE_NAME = your_mysql_database_name
DATABASE_USERNAME = your_mysql_database_username
DATABASE_PASSWORD = your_mysql_database_password
DATABASE_HOST = your_mysql_database_host
```


5. Configure API url on Frontend:

    Note the localhost address or web address at which your API is running.
    Create a .env file in the frontend directory and provide the necessary environment variables:

```bash
VITE_API_URL = your_api_url          # http://localhost:8800
```

6. Start the API and React frontend

- Start the API server:
```bash
cd api
npm run start
```

- Start the React app
```bash
cd frontend
npm run dev
```

7. Open your browser and visit [http://localhost:5173](http://localhost:5173) to access the auth system.


## Technologies Used

- Frontend
  - Vite
  - React.js
  - Chakra UI
  - Axios

- API
  - Node.js
  - Express.js
  - JWT
  - MySQL
  - Sequelize


## Folder Structure

The project is organized into the following directories:

    Authentication-System/
    ├── frontend                # Frontend codebase
    ├── api                     # API server codebase
    ├── LICENSE                 # License used
    └── README.md               # Project documentation (you are here!)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.