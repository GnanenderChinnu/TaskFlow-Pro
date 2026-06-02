# TaskFlow Pro Deployment

## Backend on Render or Railway

1. Create a PostgreSQL database in Render/Railway.
2. Create a backend web service from the GitHub repo.
3. Set the service root to `backend`.
4. Add environment variables:

```text
SECRET_KEY=<strong-random-secret>
DEBUG=False
ALLOWED_HOSTS=<your-backend-domain>
CORS_ALLOWED_ORIGINS=<your-frontend-domain>
DATABASE_URL=<postgres-service-url>
ACCESS_TOKEN_LIFETIME_MINUTES=60
REFRESH_TOKEN_LIFETIME_DAYS=7
```

5. Build command:

```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
```

6. Start command:

```bash
gunicorn taskflow.wsgi:application
```

## Frontend on Vercel or Netlify

1. Create a frontend project from the same GitHub repo.
2. Set the project root to `frontend`.
3. Add environment variable:

```text
VITE_API_BASE_URL=https://your-backend-domain/api
```

4. Build command:

```bash
npm run build
```

5. Publish directory:

```text
dist
```

## Frontend on GitHub Pages

This repo includes a GitHub Actions workflow:

```text
.github/workflows/deploy-frontend-pages.yml
```

Published frontend URL:

[https://gnanenderchinnu.github.io/TaskFlow-Pro/](https://gnanenderchinnu.github.io/TaskFlow-Pro/)

Before the hosted frontend can log in or sync tasks, add a repository variable named `VITE_API_BASE_URL` with your deployed backend API URL:

```text
https://your-backend-domain/api
```

## Database setup

Local PostgreSQL example:

```sql
CREATE DATABASE taskflow_pro;
CREATE USER taskflow_user WITH PASSWORD 'change-me';
GRANT ALL PRIVILEGES ON DATABASE taskflow_pro TO taskflow_user;
```

Then set:

```text
DATABASE_URL=postgres://taskflow_user:change-me@localhost:5432/taskflow_pro
```

## Production checklist

- Use a strong `SECRET_KEY`.
- Keep `DEBUG=False`.
- Keep `.env` out of GitHub.
- Use HTTPS domains in `CORS_ALLOWED_ORIGINS`.
- Run migrations during deploy.
- Create a superuser only through a secure one-off shell.
- Configure backups for PostgreSQL.
- Add background workers before enabling reminder notifications.
