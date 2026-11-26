# Morelly Welding Backend

This repository contains the REST API for Morelly Welding,
my final project for the TripleTen Software Engineering program.

The backend handles user authentication, profile management,
welding project requests, database operations, and email notifications.

## Live Deployment

- [Live Website](https://morellywelding.com)
- [Backend API](https://morellywelding.com/api)
- [API Test Endpoint](https://morellywelding.com/api/auth/me)

The backend is deployed on a Google Cloud Compute Engine
virtual machine and is publicly accessible through HTTPS.

To verify that the deployed API is accessible, run:

```bash
curl -i https://morellywelding.com/api/auth/me
```

Expected HTTP status: `401 Unauthorized`.

Expected response:

```json
{
  "message": "Authorization token required."
}
```

This endpoint requires a valid JWT. The API base URL
does not have a dedicated GET route.

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Celebrate and Joi
- Multer
- Resend

## API Endpoints

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Log in | No |
| GET | `/api/auth/me` | Retrieve the current user | Required |
| POST | `/api/project-requests` | Submit a project request | Required |
| GET | `/api/project-requests` | Retrieve project requests | Required |

Protected endpoints require a valid JWT in the
Authorization header:

```text
Authorization: Bearer <token>
```

The API also supports updating user profiles,
uploading profile pictures, and deleting project requests.

## Running Locally

### Clone the Repository

```bash
git clone https://github.com/morelly89/welding-project-backend.git
```

Move into the backend directory:

```bash
cd welding-project-backend
```

### Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory of the backend
project using the included `.env.example` file as a template.

The required environment variables are:

```env
MONGODB_URI=
JWT_SECRET=
RESEND_API_KEY=
PORT=3001
```

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to create and verify authentication tokens
- `RESEND_API_KEY` — API key used for email notifications
- `PORT` — port used by the backend server

Actual credentials and secret values are private
and are not included in this repository.

## Start the Server

After configuring the environment variables, start the server:

```bash
npm start
```

The local API base URL is:

<http://localhost:3001/api>

## Production Deployment

The production environment uses:

- Google Cloud Compute Engine — cloud hosting
- Nginx — reverse proxy for API requests
- PM2 — Node.js process management
- MongoDB Atlas — production database
- Cloudflare — DNS management
- Certbot and Let's Encrypt — HTTPS certificates

## Frontend Repository

[Morelly Welding Frontend](https://github.com/morelly89/welding-project-frontend)

## Video Walkthrough

[Watch the Project Walkthrough](https://drive.google.com/file/d/1a-J8P4TXxjte8i6UFWB99u1TYe7KYGP8/view?usp=sharing)

## Author

Abdullah Morelly
