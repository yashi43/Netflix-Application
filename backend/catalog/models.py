from django.db import models


class Movie(models.Model):

    CONTENT_TYPES = [
        ('movie', 'Movie'),
        ('series', 'Series'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    genre = models.CharField(max_length=100)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    release_year = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    duration = models.CharField(max_length=50)
    director = models.CharField(max_length=150)
    cast = models.TextField()
    poster_url = models.URLField()
    banner_url = models.URLField()
    trailer_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title