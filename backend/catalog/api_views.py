from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Movie
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    """
    Full CRUD REST API for Movie.
    GET    /api/movies/       -> list all movies
    POST   /api/movies/       -> create a movie
    GET    /api/movies/<id>/  -> retrieve a movie
    PUT    /api/movies/<id>/  -> update a movie
    PATCH  /api/movies/<id>/  -> partial update
    DELETE /api/movies/<id>/  -> delete a movie
    """
    queryset = Movie.objects.all().order_by('-release_year')
    serializer_class = MovieSerializer
    permission_classes = [AllowAny]
