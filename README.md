# Feedants Competition App

A competition details application with an Expo React Native frontend and an Express/MongoDB backend.

## Project Structure

```text
backend/
	server.js
	src/
		app.js
		config/db.js
		controllers/
		middleware/
		models/
		routes/
		services/
		seed.js
frontend/
	App.js
	src/screens/CompetitionDetailsScreen.js
	src/services/competitionApi.js
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB connection string

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Set `MONGODB_URI` in `backend/.env` to your MongoDB connection string. The default API port is `3000`.

Seed the sample competition once:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The API is available at `http://localhost:3000`.

## Frontend Setup

```bash
cd frontend
npm install
npm run web
```

For Expo Web, open the URL shown by Expo. The frontend requests competition data from:

```text
http://localhost:3000/api/competition/classical-dance
```

The backend must be running on port `3000` when using the frontend in a browser.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Check backend status |
| `GET` | `/api/competition` | Get the current competition response |
| `GET` | `/api/competition/:id` | Get a competition by ID |

The seeded competition ID is `classical-dance`.

## Backend Architecture

- `server.js`: loads environment variables, connects to MongoDB, and starts the server.
- `src/app.js`: configures Express, CORS, JSON parsing, routes, and error handling.
- `src/config/db.js`: MongoDB connection helper.
- `src/models/Competition.js`: Mongoose competition schema.
- `src/services/competitionService.js`: competition data access.
- `src/controllers/competitionController.js`: HTTP request and response handling.
- `src/routes/competitionRoutes.js`: competition endpoints.
- `src/seed.js`: safe, repeatable sample-data seed script.

## Frontend Data Flow

`CompetitionDetailsScreen` loads through `src/services/competitionApi.js` using the browser-compatible `fetch()` API. It displays loading, error, and successful competition states. Competition values shown in the screen come from the backend response rather than local hardcoded sample data.
