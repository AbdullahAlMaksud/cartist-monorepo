# Cartist Monorepo

Welcome to the **Cartist Monorepo**, a collaborative task, shopping list, and note-taking platform. This repository is structured as a monorepo managed using **Bun Workspaces** to coordinate the frontend portals, mobile applications, and backend API servers.

---

## 🚀 Technology Stack

### Monorepo Coordination
- **Package Manager:** [Bun v1.3+](https://bun.sh/)
- **Workspaces:** Native Bun Workspaces configuration with flat hoisting.

### Backend Application (`server/`)
- **Runtime:** Node.js (via Bun compatibility layer)
- **Framework:** [Hono](https://hono.dev/)
- **Database:** [MongoDB](https://www.mongodb.com/) (using [Mongoose v8](https://mongoosejs.com/) for schemas and model management)
- **Authentication:** [Better Auth](https://better-auth.com/) (Email/Password, Google OAuth, and RBAC User/Admin role plugin)

### User Portal Frontend (`user-potal/`)
- **Framework:** [Next.js 16 (Turbopack)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling:** CSS & Tailwind CSS
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 📂 Repository Structure

```
cartist-monorepo/
├── package.json          # Monorepo workspaces and script runner
├── bunfig.toml           # Bun package manager configuration
├── bun.lock              # Bun lockfile
├── walkthrough.md        # Technical migration log
├── user-potal/           # Next.js collaborative Shopping List app
├── server/               # Hono backend API server (Auth & Notes)
├── admin-portal/         # Empty workspace for future Admin portal
└── mobile-app/           # Empty workspace for future Mobile App
```

---

## ⚙️ Environment Configurations

Before starting the application, you must set up the environment variables for the Hono server.

### Backend Setup
Create a `.env` file in the `server/` directory:
```bash
cp server/.env.example server/.env
```

Define the variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cartist
BETTER_AUTH_SECRET=your_32_character_security_key
BETTER_AUTH_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

---

## 🛠️ Getting Started & Run Scripts

### Installation
From the root directory, install dependencies for all workspaces:
```bash
bun install
```

### Script Execution Commands

Run these scripts from the monorepo root:

| Command | Action | Description |
| :--- | :--- | :--- |
| `bun run dev:server` | Start Server (Dev) | Runs the Hono backend server in development watch mode. |
| `bun run start:server` | Start Server (Prod)| Starts the Hono backend server using Bun. |
| `bun run dev:user` | Start User Portal (Dev)| Starts the Next.js portal frontend on `localhost:3000`. |
| `bun run build:user` | Build User Portal | Compiles the Next.js portal application for production. |

---

## 🌐 API Reference Map

### Authentication Endpoints (`/api/auth`)
Better Auth handles these endpoints natively for email/password and social login:

- `POST /api/auth/signup` - Register a new user account.
- `POST /api/auth/signin` - Sign in using email & password.
- `GET /api/auth/signin/social` - Trigger social login (Google OAuth).
- `GET /api/auth/session` - Retrieve the current active user session.

### Notes Endpoints (`/api/notes`)
Allows CRUD operations, email-based sharing, and link-based public sharing:

- `GET /api/notes` - Fetch all notes owned by or shared with the authenticated user.
- `POST /api/notes` - Create a new note.
- `GET /api/notes/:id` - Retrieve a specific note (verifies access).
- `PUT /api/notes/:id` - Update a note (owner only).
- `DELETE /api/notes/:id` - Delete a note (owner only).
- `POST /api/notes/:id/share-email` - Share note with a user by email.
- `POST /api/notes/:id/share-link` - Toggle public sharing on/off and get public URL.
- `GET /api/notes/shared/:token` - **Public Endpoint:** View a note using a share token.
- `POST /api/notes/shared/:token/save` - Save a copy of a shared public note to the active account.

### Administrative Endpoints (`/api/admin`)
Requires the authenticated user to have the `'admin'` role:

- `GET /api/admin/notes` - Retrieve all notes stored in the database.
- `GET /api/admin/users` - Retrieve all registered users.
- `DELETE /api/admin/users/:id` - Delete a user account and all notes owned by them.
