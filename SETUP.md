# Mastermind OS Dashboard - Local Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher recommended)
2. **PostgreSQL Database** (local or cloud)
   - Option A: Local PostgreSQL installation
   - Option B: Neon (serverless PostgreSQL) - [neon.tech](https://neon.tech)
   - Option C: Any PostgreSQL-compatible database

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (already created):

```env
# Database Configuration
# For local PostgreSQL:
DATABASE_URL=postgresql://user:password@localhost:5432/mastermind?sslmode=disable

# For Neon (cloud):
# DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Important:** Replace the DATABASE_URL with your actual database connection string.

### 3. Set Up Database

#### Option A: Local PostgreSQL

1. Install PostgreSQL if not already installed
2. Create a database:
   ```bash
   createdb mastermind
   ```
3. Update `.env` with your PostgreSQL credentials:
   ```env
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/mastermind?sslmode=disable
   ```

#### Option B: Neon (Cloud PostgreSQL)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update `.env` with the Neon connection string

### 4. Run Database Migrations

```bash
npm run db:push
```

This will create all necessary tables in your database.

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on port 5000 (or the port specified in `.env`).

The dashboard will be available at: `http://localhost:5000`

## Project Structure

- `client/` - React frontend (Vite)
- `server/` - Express backend
- `shared/` - Shared TypeScript types and schemas

## Available Scripts

- `npm run dev` - Start development server (serves both API and client)
- `npm run dev:client` - Start only the Vite dev server (port 5000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## API Endpoints

The server provides the following main endpoints:

- `GET /api/health` - Health check
- `GET /api/stats` - Dashboard statistics
- `GET /api/bot/status` - Bot status
- `POST /api/bot/control` - Control bot (start/stop/pause/resume/reset)
- `GET /api/conversations` - List conversations
- `GET /api/messages/:conversationId` - Get messages for a conversation
- `POST /api/messages` - Send a message
- `GET /api/logs` - Get logs
- `GET /api/live-messages` - SSE stream for live messages
- `GET /api/logs` (SSE) - SSE stream for logs
- `POST /api/seed` - Seed demo data

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. Verify your DATABASE_URL is correct
2. Ensure PostgreSQL is running (if using local)
3. Check firewall/network settings (if using cloud)
4. Verify database credentials

### Port Already in Use

If port 5000 is already in use:

1. Change the PORT in `.env`
2. Or stop the process using port 5000

### TypeScript Errors

Run type checking:
```bash
npm run check
```

### Missing Dependencies

If you see import errors:
```bash
npm install
```

## Notes

- The dashboard uses Server-Sent Events (SSE) for real-time updates
- CORS is enabled for local development
- The server serves both the API and the React client in development mode
- In production, the client is built and served as static files
