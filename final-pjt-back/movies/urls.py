from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.movie_list, name='movie_list'),
    path('<int:movieid>/', views.movie_detail, name='movie_detail'),
    path('get_movie_datas/', views.get_movie_datas, name='get_movie_datas'),
    path('get_genre/', views.get_genre, name='get_genre'),
]
