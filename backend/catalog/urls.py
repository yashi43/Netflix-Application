from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),

    path(
        'movie/<int:pk>/',
        views.movie_detail,
        name='movie_detail'
    ),

    path(
        'add-movie/',
        views.add_movie,
        name='add_movie'
    ),

    path(
        'edit-movie/<int:pk>/',
        views.edit_movie,
        name='edit_movie'
    ),

    path(
        'delete-movie/<int:pk>/',
        views.delete_movie,
        name='delete_movie'
    ),
]