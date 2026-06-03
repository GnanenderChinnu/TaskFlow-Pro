# TaskFlow Pro

TaskFlow Pro is a production-ready MVP for a cloud-based task, checklist, and project workflow app. It uses React + Vite + Tailwind CSS on the frontend and Django REST Framework + PostgreSQL + JWT authentication on the backend.

## Live Frontend

Frontend website:

[https://gnanenderchinnu.github.io/TaskFlow-Pro/](https://gnanenderchinnu.github.io/TaskFlow-Pro/)

Vercel frontend website:

[https://task-flow-pro-seven.vercel.app/](https://task-flow-pro-seven.vercel.app/)

GitHub repository:

[https://github.com/GnanenderChinnu/TaskFlow-Pro](https://github.com/GnanenderChinnu/TaskFlow-Pro)

Hosted backend API:

[https://taskflow-pro-backend-8q76.onrender.com/api](https://taskflow-pro-backend-8q76.onrender.com/api)

## Folder structure

```text
TaskFlow-Pro/
├── backend/
│   ├── accounts/          # Custom user, auth serializers/views, JWT endpoints
│   ├── analytics/         # Dashboard stats, productivity, workload APIs
│   ├── projects/          # Project and category models/APIs
│   ├── tasks/             # Task, subtask, activity, reminder models/APIs
│   ├── taskflow/          # Django settings, URLs, ASGI/WSGI
│   ├── .env.example
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/api/           # Axios API client and task service
│   ├── src/components/    # Layout, protected routes, cards, modal UI
│   ├── src/context/       # Auth and theme providers
│   ├── src/pages/         # Landing, auth, dashboard, tasks, kanban, calendar
│   ├── .env.example
│   └── package.json
├── docs/
├── screenshots/
├── README.md
└── DEPLOYMENT.md
```

## Backend setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Create a PostgreSQL database named `taskflow_pro`, then update `backend/.env` if your username, password, host, or port differs.

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_demo
python manage.py runserver
```

Backend runs at `http://localhost:8000`.

## Frontend setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Local test flow

1. Start PostgreSQL and the Django backend.
2. Run `python manage.py seed_demo`.
3. Start the frontend.
4. Log in with `demo` / `DemoPass123!`.
5. Open Tasks, create a task, set priority/status/due date, and save.
6. Refresh or log in from another browser/device pointing to the same backend. The task is loaded from PostgreSQL through the authenticated API.

## Key API endpoints

- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `POST /api/auth/logout/`
- `GET /api/auth/me/`
- `GET|POST /api/projects/`
- `GET|PUT|DELETE /api/projects/:id/`
- `GET|POST /api/tasks/`
- `GET|PUT|DELETE /api/tasks/:id/`
- `PATCH /api/tasks/:id/complete/`
- `PATCH /api/tasks/:id/status/`
- `GET|POST /api/tasks/:id/subtasks/`
- `PATCH /api/subtasks/:id/complete/`
- `GET /api/dashboard/stats/`
- `GET /api/analytics/productivity/`
- `GET /api/analytics/workload/`
- `GET /api/tasks/export/csv/`

## What to push to GitHub

Push all source files, migrations, docs, and examples:

- `backend/`
- `frontend/`
- `docs/`
- `screenshots/.gitkeep`
- `.gitignore`
- `README.md`
- `DEPLOYMENT.md`

Do not push `.env`, virtual environments, `node_modules`, build output, or local database files.

## Current MVP scope

Implemented: JWT auth, protected frontend routes, dashboard cards, task CRUD, complete/incomplete toggles, priority/status/type/due dates, projects, categories, subtasks API, Kanban, calendar view, completed history, analytics, CSV export, dark/light mode, validation and error states.

Good next production steps: email verification, password reset, reminder notification jobs, drag-and-drop Kanban, team invitations, audit-log detail UI, and automated test coverage.
