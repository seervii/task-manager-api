# Task Manager API

A REST API for a task management tool — organize work into Projects, with Tasks nested under each Project. Think of it as a simplified backend for something like Trello or Asana.

## Features
- Full CRUD for Projects and Tasks
- User signup/login with JWT authentication
- Passwords hashed with bcrypt (never stored in plain text)
- PostgreSQL database with relational data — Tasks are linked to Projects via a foreign key
- Protected write routes (create/update/delete require login); read routes are public
- CORS-enabled to support a separate frontend

## Tech Stack
Node.js, Express, PostgreSQL, JWT (jsonwebtoken), bcrypt

## Setup
1. Clone the repo
2. `npm install`
3. Create a PostgreSQL database named `taskmanager`
4. Create a `.env` file with `JWT_SECRET=your-secret-here`
5. `node index.js`

## API Endpoints

| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | `/signup` | No | Create a new user |
| POST | `/login` | No | Log in, returns a JWT |
| GET | `/projects` | No | List all projects |
| GET | `/projects/:id` | No | Get one project |
| POST | `/projects` | Yes | Create a project |
| PUT | `/projects/:id` | Yes | Update a project |
| DELETE | `/projects/:id` | Yes | Delete a project |
| GET | `/tasks` | No | List all tasks |
| GET | `/tasks/:id` | No | Get one task |
| POST | `/tasks` | Yes | Create a task |
| PUT | `/tasks/:id` | Yes | Update a task |
| DELETE | `/tasks/:id` | Yes | Delete a task |

### Example: logging in

**Request**
