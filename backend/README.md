

netflix is a simple movie and web series website made using Django.

## About the Project

I created this project to understand how Django models, views, templates,
forms and admin panel work together.

The project allows users to login and view movies. Movies can be added,
edited and deleted using the application.

## Features

- User Signup
- User Login
- User Logout
- View Movies
- View Movie Details
- Add Movie
- Edit Movie
- Delete Movie
- Django Admin Panel

## Technologies Used

- Python
- Django
- HTML
- CSS
- SQLite

## Django Concepts Used

- Django Models
- Django Views
- Django Templates
- Django URLs
- ModelForms
- Django Authentication
- Django Admin
- Django ORM

## Project Structure

```text
Django_netflix
│
├── accounts
│   ├── views.py
│   └── urls.py
│
├── catalog
│   ├── models.py
│   ├── views.py
│   ├── forms.py
│   ├── urls.py
│   └── admin.py
│
├── netflix
│   ├── settings.py
│   └── urls.py
│
├── templates
│   ├── base.html
│   ├── home.html
│   ├── login.html
│   ├── signup.html
│   ├── movie_detail.html
│   ├── add_movie.html
│   ├── edit_movie.html
│   └── delete_movie.html
│
├── db.sqlite3
├── manage.py
└── README.md