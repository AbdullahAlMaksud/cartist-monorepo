# Walkthrough - Bun Workspace Migration and Hono Notes Server

We have migrated the monorepo to be managed via **Bun** and implemented a TypeScript Hono server in the `server` workspace, integrated with **Better Auth** (Google & Email logins, User/Admin roles) and **MongoDB** (via Mongoose). The monorepo has been successfully committed and pushed to the GitHub repository.

---

## 1. Bun Workspaces Configuration

- Deleted `package-lock.json` and generated `bun.lock` to handle the workspace dependencies.
- Updated root [package.json](package.json) scripts to run workspace scripts using Bun's native `--filter` workspaces flag:
  - `dev:server` -> `bun run --filter server dev`
  - `start:server` -> `bun run --filter server start`
  - `dev:user` -> `bun run --filter cartist dev`
  - `build:user` -> `bun run --filter cartist build`
- Added recursive ignore rules to root [\.gitignore](.gitignore) for `.env` files to prevent leak of credentials.

---

## 2. Hono Notes Server (`server/` workspace)

The server is located in the `server/` directory and contains the following file structure:
- `server/package.json`: Declares server dependencies.
- `server/tsconfig.json`: TypeScript configuration for compile/runtime.
- `server/.env`: Environment secrets.
- `server/src/db.ts`: Connects Mongoose and exports native `MongoClient` for Better Auth.
- `server/src/auth.ts`: Better Auth initialization with Email/Password and Google Social providers, and the `admin` plugin for roles.
- `server/src/models/Note.ts`: Mongoose `Note` schema.
- `server/src/middleware/auth.ts`: Hono session authentication middleware.
- `server/src/routes/notes.ts`: Endpoints for Notes operations, link/email sharing, and public copying.
- `server/src/routes/admin.ts`: Endpoints for administrative functions.
- `server/src/index.ts`: Main Hono assembly.

### Notes API Endpoints (`/api/notes`)

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/notes/shared/:token` | No | Retrieves note contents via a public sharing token. |
| **GET** | `/api/notes` | Yes | Retrieves all notes owned by or shared (via email) with the logged-in user. |
| **POST** | `/api/notes` | Yes | Creates a new note (body: `title`, `content`). |
| **GET** | `/api/notes/:id` | Yes | Fetches a single note (verifies owner or shared recipient access). |
| **PUT** | `/api/notes/:id` | Yes | Updates note title/content (owner only). |
| **DELETE** | `/api/notes/:id` | Yes | Deletes note (owner only). |
| **POST** | `/api/notes/:id/share-email` | Yes | Shares a note with another user by adding their `email` (body: `email`, owner only). |
| **POST** | `/api/notes/:id/share-link` | Yes | Toggles public sharing on/off and returns/generates a secure `shareToken` (body: `isPublic: boolean`, owner only). |
| **POST** | `/api/notes/shared/:token/save` | Yes | Saves a copy of a shared public note to the current logged-in user's account. |

### Administrative API Endpoints (`/api/admin`)
*All admin routes require a valid session where `user.role === 'admin'`.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/admin/notes` | View all notes stored in the database. |
| **GET** | `/api/admin/users` | View all registered users in the database (sanitized). |
| **DELETE** | `/api/admin/users/:id` | Delete a user and all notes owned by them. |

---

## 3. How to Setup and Run Locally

### Prerequisites
Make sure you have MongoDB running locally at `mongodb://localhost:27017` or update the `MONGODB_URI` in `server/.env`.

### Installation
From the root directory, install all dependencies:
```bash
bun install
```

### Running Hono Server (Dev Mode)
To run the Hono notes server in development watch mode:
```bash
bun run dev:server
```

### Running Hono Server (Production Mode)
```bash
bun run start:server
```
The server will start on port `5000` (by default) and log `MongoDB Connected via Mongoose` and `Database initialized`.

---

## 4. Git Push Verification

The initial monorepo codebase has been committed and pushed to:
`https://github.com/AbdullahAlMaksud/cartist-monorepo.git`
It is fully set up on the remote tracking branch `origin/main`.
