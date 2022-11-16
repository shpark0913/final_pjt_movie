from django.shortcuts import render
from .models import Movie
from .serializers import MovieListSerializer
from rest_framework.response import Response 
# Create your views here.

def movie_list_json(request):
    movies = Movie.objects.all()
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)