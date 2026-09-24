from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):

    # Normalize field names to match the React frontend's expected keys
    year = serializers.IntegerField(source='release_year')
    type = serializers.CharField(source='content_type')
    poster = serializers.URLField(source='poster_url')
    trailer = serializers.URLField(source='trailer_url')

    class Meta:
        model = Movie
        fields = [
            'id',
            'title',
            'description',
            'genre',
            'type',          # maps to content_type
            'year',          # maps to release_year
            'rating',
            'duration',
            'director',
            'cast',
            'poster',        # maps to poster_url
            'banner_url',
            'trailer',       # maps to trailer_url
            'created_at',
        ]

    def create(self, validated_data):
        return Movie.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
