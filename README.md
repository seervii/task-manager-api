# Task Manager API

A REST API for a task management tool — organize work into Projects, with Tasks nested under each Project.

## Features
- Full CRUD for Projects and Tasks
- User signup/login with JWT authentication
- Passwords hashed with bcrypt
- PostgreSQL database with relational data (Tasks linked to Projects via foreign key)
- Protected write routes (create/update/delete require login); read routes are public

## Tech Stack
Node.js, Express, PostgreSQL, JWT, bcrypt

## Setup
1. Clone the repo
2. `npm install`
3. Create a PostgreSQL database named `taskmanager`
4. Create a `.env` file with `JWT_SECRET=your-secret-here`
5. `node index.js`

## API Endpoints
- `POST /signup`, `POST /login`
- `GET /projects`, `GET /projects/:id`, `POST /projects`, `PUT /projects/:id`, `DELETE /projects/:id`
- `GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`

## Frontend
Paired with a React frontend: [task-manager-frontend](https://github.com/seervii/task-manager-frontend)

## Possible future improvements
- Restrict edits/deletes to the resource's owner
- Frontend: edit task status, delete buttons
