from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.response import Response 
from rest_framework.decorators import api_view
from django.http import HttpResponse
from rest_framework import status
import requests, random
from .models import Movie, Genre, Review, Genrename
from .serializers import MovieListSerializer, MovieDetailSerializer, ReviewListSerializer
from django.contrib.auth import get_user_model

API_KEY = '3e6bef93583f44f23148ae1a83169eb1'

# 전체 영화 조회
@api_view(['GET'])
def movie_list(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)

# 단일 영화 조회
@api_view(['GET'])
def movie_detail(request, movieid):
    # movie = Movie.objects.get(movieid=movieid)
    movie = get_object_or_404(Movie, movieid=movieid)
    serializer = MovieDetailSerializer(movie)
    return Response(serializer.data)

# GET : 특정 영화 전체 review 조회  /  POST : 특정 영화의 review 작성
@api_view(['POST', 'GET'])
def review(request, movieid):
    if request.method == 'POST':
        movie = Movie.objects.get(movieid=movieid)
        serializer = ReviewListSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie=movie, user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'GET':
        reviews = get_list_or_404(Review, movie=movieid)
        serializer = ReviewListSerializer(reviews, many=True)
        return Response(serializer.data)

# GET : 특정 review 조회  /  PUT : 특정 review 수정  /  DELETE : 특정 review 삭제
@api_view(['GET', 'PUT', 'DELETE'])
def review_UD(request, review_pk):
    r = Review.objects.get(pk=review_pk)
    if request.method == 'GET':
        serializer = ReviewListSerializer(r)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        r.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    elif request.method == 'PUT':
        serializer = ReviewListSerializer(r, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

# username 받으면 user의 pk 반환하기
@api_view(['GET'])
def wantuserpk(request, username):
    u = get_object_or_404(get_user_model(), username=username)
    return Response({'user_pk': u.pk})

# username 받고 그 user가 좋아요, 싫어요 한 영화와 작성한 댓글 출력
@api_view(['GET'])
def profile(request, username):
    u = get_object_or_404(get_user_model(), username=username)
    reviews = get_list_or_404(Review, user_id=u.pk)
    movie_like = []
    movie_unlike = []
    review_like = []
    review_unlike = []
    for review in reviews:
        if review.vote_average:
            movie_like.append(review.movie_id)
            review_like.append({'movieid': review.movie_id, 'content': review.content})
        else:
            movie_unlike.append(review.movie_id)
            review_unlike.append({'movieid': review.movie_id, 'content': review.content})
    return Response({'userid': u.pk, 'username': u.username, 'likes': movie_like, 'unlikes': movie_unlike, 'like_reviews': review_like, 'unlike_reviews': review_unlike})

# tmdb에서 추천 영화 받기
@api_view(['GET'])
def recommend(request, movieid):
    request_url = f"https://api.themoviedb.org/3/movie/{movieid}/recommendations?api_key={API_KEY}&language=ko-KR&page=1"
    movies = requests.get(request_url).json()
    
    # 받아온 movie들 DB에 추가 저장
    for movie in movies['results']:
        movie_instance = Movie()
        movie_instance.title  = movie['title']
        movie_instance.movieid  = movie['id']
        movie_instance.backdrop_path = movie['backdrop_path']
        movie_instance.release_date = movie.get('release_date')
        movie_instance.vote_average = movie['vote_average']
        movie_instance.overview = movie['overview']
        movie_instance.poster_path = movie['poster_path']
        if movie_instance.overview and movie_instance.release_date and movie_instance.poster_path and movie_instance.backdrop_path:
            movie_instance.save()
            for genre in movie.get('genre_ids'):
                movie_instance.genres.add(genre)
    
    m = movies['results']
    return Response({'recommendations': m})


# DB 에 저장되어 있는 영화 중 장르에 따라 10개(10개 미만일 수도 있음) 추천 
@api_view(['GET'])
def recommend10(request, genre_pk):
    genre = get_object_or_404(Genre, pk=genre_pk)
    sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
    movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
    serializer = MovieListSerializer(movies, many=True)
    return Response(serializer.data)
    
# @api_view(['GET'])
# def action10(request):
#     genre = get_object_or_404(Genre, pk=28)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def romance10(request):
#     genre = get_object_or_404(Genre, pk=10749)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def fantasy10(request):
#     genre = get_object_or_404(Genre, pk=14)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def ani10(request):
#     genre = get_object_or_404(Genre, pk=16)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def drama10(request):
#     genre = get_object_or_404(Genre, pk=18)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def fear10(request):
#     genre = get_object_or_404(Genre, pk=27)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def comedy10(request):
#     genre = get_object_or_404(Genre, pk=35)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def history10(request):
#     genre = get_object_or_404(Genre, pk=36)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def west10(request):
#     genre = get_object_or_404(Genre, pk=37)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def thrill10(request):
#     genre = get_object_or_404(Genre, pk=53)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def crime10(request):
#     genre = get_object_or_404(Genre, pk=80)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def docu10(request):
#     genre = get_object_or_404(Genre, pk=99)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def sf10(request):
#     genre = get_object_or_404(Genre, pk=878)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def mystery10(request):
#     genre = get_object_or_404(Genre, pk=9648)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def music10(request):
#     genre = get_object_or_404(Genre, pk=10402)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def family10(request):
#     genre = get_object_or_404(Genre, pk=10751)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def war10(request):
#     genre = get_object_or_404(Genre, pk=10752)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def tvmovie10(request):
#     genre = get_object_or_404(Genre, pk=10770)
#     sampleNum = min(10, len(list(genre.movie_set.all()[:100])))
#     movies = random.sample(list(genre.movie_set.all()[:100]), sampleNum)
#     serializer = MovieListSerializer(movies, many=True)
#     return Response(serializer.data)
###################################################################


# 초반 fixtures data 만들기 위한 함수
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
        print(genre)
        g.genreid = genre['id']
        g.name = genre['name']
        if g.genreid and g.name:
            g.save()
    return HttpResponse()
###################################################################