# netflix — Full-Stack Movie Application

A full-stack web application for browsing, managing, and discovering movies and series.

**Backend:** Django 6.1.1 + Django REST Framework  
**Frontend:** React 19 + Vite  
**Database:** SQLite

---

## Project Structure

```
netflix Application/
├── backend/      ← Django REST API
└── frontend/     ← React UI
```

---

## Setup & Run Locally

### Backend (Django)

```bash
cd backend
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py loaddata movies       # loads sample movies
python manage.py createsuperuser       # optional (admin panel access)
python manage.py runserver
```

API runs at: `http://localhost:8000/api/movies/`

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

UI runs at: `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/` | List all movies |
| POST | `/api/movies/` | Create a movie |
| GET | `/api/movies/<id>/` | Get movie by ID |
| PUT | `/api/movies/<id>/` | Update a movie |
| DELETE | `/api/movies/<id>/` | Delete a movie |

---

## Features

- Browse movies and series with search, filter, and sort
- Full CRUD: Add, Edit, Delete movies via React UI
- Favorites saved to localStorage
- Movie detail modal with YouTube trailer embed
- Django Admin panel at `/admin/`
