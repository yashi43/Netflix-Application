from django.contrib import admin
from .models import Movie


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'content_type',
        'genre',
        'release_year',
        'rating',
    )

    search_fields = (
        'title',
        'genre',
        'director',
    )

    list_filter = (
        'content_type',
        'genre',
    )