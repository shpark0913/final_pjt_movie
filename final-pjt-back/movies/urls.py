from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    path('', views.movie_list, name='movie_list'),
    
    path('<int:movieid>/', views.movie_detail, name='movie_detail'),
    
    path('get_movie_datas/', views.get_movie_datas, name='get_movie_datas'),
    path('get_genre/', views.get_genre, name='get_genre'),
    
    path('<int:movieid>/review/', views.review, name='review'),
    
    path('review/<int:review_pk>/', views.review_UD, name='review_UD'),
]