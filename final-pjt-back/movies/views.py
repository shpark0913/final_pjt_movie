from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from django.http import HttpResponse
import requests

from .models import Movie, Genre
from .serializers import MovieListSerializer, MovieDetailSerializer
# Create your views here.

@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def movie_detail(request, movieid):
    # movie = Movie.objects.get(movieid=movieid)
    movie = get_object_or_404(Movie, movieid=movieid)
    serializer = MovieDetailSerializer(movie)
    return Response(serializer.data)


API_KEY = '3e6bef93583f44f23148ae1a83169eb1'
def get_movie_datas(request):
    for i in range(1, 30):
        request_url = f"https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=ko-KR&page={i}"
        movies = requests.get(request_url).json()
        for movie in movies['results']:
            movie_instance = Movie()
            movie_instance.title  = movie['title']
            movie_instance.movieid  = movie['id']
            movie_instance.backdrop_path = movie['backdrop_path']
            movie_instance.release_date = movie.get('release_date')
            movie_instance.vote_average = movie['vote_average']
            movie_instance.overview = movie['overview']
            movie_instance.poster_path = movie['poster_path']
            # movie_instance.genres = movie.get('genre_ids')   
            if movie_instance.overview and movie_instance.release_date and movie_instance.poster_path and movie_instance.backdrop_path:
                movie_instance.save()
                for genre in movie.get('genre_ids'):
                    movie_instance.genres.add(genre)
    return HttpResponse()


def get_genre(request):
    request_url = f"https://api.themoviedb.org/3/genre/movie/list?api_key={API_KEY}&language=ko-KR"
    genres = requests.get(request_url).json()
    for genre in genres['genres']:
        g = Genre()
        g.genreid = genre['id']
        g.name = genre['name']
        if g.genreid and g.name:
            g.save()
    return HttpResponse()