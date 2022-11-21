from rest_framework import serializers
from .models import Movie, Review, Genre

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'
        read_only_fields = ('genre',)


class MovieListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'


class ReviewListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('movie', 'user',)


class MovieDetailSerializer(serializers.ModelSerializer):
    review_set = ReviewListSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = '__all__'
