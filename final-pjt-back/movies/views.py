from django.shortcuts import render
from .models import Movie
# from .serializers import MovieListSerializer
from rest_framework.response import Response 
import requests
# Create your views here.

API_KEY = '3e6bef93583f44f23148ae1a83169eb1'
from django.http import HttpResponse
def get_movie_datas(request):
    for i in range(1, 30):
        request_url = f"https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=ko-KR&page={i}"
        movies = requests.get(request_url).json()
        for movie in movies['results']:
            print(movie)
            movie_instance = Movie()
            movie_instance.title  = movie['title']
            movie_instance.movieid  = movie['id']
            movie_instance.backdrop_path = movie['backdrop_path']
            movie_instance.release_date = movie.get('release_date')
            movie_instance.vote_average = movie['vote_average']
            movie_instance.overview = movie['overview']
            movie_instance.poster_path = movie['poster_path']
            movie_instance.genres = movie.get('genre_ids')   
            if movie_instance.overview and movie_instance.release_date and movie_instance.poster_path and movie_instance.backdrop_path:
                movie_instance.save()

    return HttpResponse()