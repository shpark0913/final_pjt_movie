from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    # 전체 영화 리스트 조회
    path('', views.movie_list, name='movie_list'),
    
    # 특정 영화 조회
    path('<int:movieid>/', views.movie_detail, name='movie_detail'),
    
    # 영화 데이터와 장르 데이터 받아오는 path. 안 써도 괜찮
    path('get_movie_datas/', views.get_movie_datas, name='get_movie_datas'),
    path('get_genre/', views.get_genre, name='get_genre'),
    
    # Review 가보자구 1
    path('review/', views.review_all, name='review_all'),
    
    # Review 가보자구 2 - GET 방식 -> 해당 movieid의 모든 리뷰 조회, POST 방식 -> 리뷰 등록
    path('<int:movieid>/review/', views.review, name='review'),
    
    # # Review 가보자구 3
    # path('<int:movieid>/review/update/', views.review, name='review'),
    
    # # Review 가보자구 3
    # path('<int:movieid>/review/delete/', views.review, name='review'),
]