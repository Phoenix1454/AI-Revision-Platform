# AI Revision Platform

A revision-planning web app: users register subjects and topics, and the platform generates a day-by-day study schedule that spreads their topics evenly across however many days they have before an exam.

> Note: the plan generation is currently a deterministic scheduler (even distribution of topics across days), not an LLM-based planner — see `generate_plan` in `backend/app.py`.

## What it does

- **Add user & subjects** — `POST /adduser` stores a user's subjects/topics in Firestore
- **Generate a revision plan** — `POST /generateplan` takes an email + number of days, fetches the user's topics, and splits them evenly across the days, saving the result to Firestore
- **Fetch a user's saved plans** — `GET /getplans/<email>`
- **Lookup a user** — `GET /getuser/<email>`

## Tech Stack

| Layer | Tools |
|---|---|
| Backend | Flask, Flask-CORS |
| Database | Firebase Firestore (via `firebase-admin`) |
| Frontend | React (Create React App) |
| Hosting | Backend on Render, frontend on Vercel |

## Project Structure

```
backend/
  app.py        Flask API: user CRUD + plan generation
frontend/
  src/components/
    AddUser.js       Form to register a user's subjects/topics
    GeneratePlan.js  Form to request a revision plan
    ViewPlans.js     Displays saved plans
```

## Running locally

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Set `GOOGLE_APPLICATION_CREDENTIALS_JSON` in a `.env` file to the JSON contents of a Firebase service account key (Firebase Console → Project Settings → Service Accounts → Generate new private key). The app reads this from the environment — do not commit the key file itself.

```bash
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm start
```
