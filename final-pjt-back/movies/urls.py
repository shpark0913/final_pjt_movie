from django.urls import path
from . import views

app_name = 'movies'
urlpatterns = [
    # 전체 영화 조회
    path('', views.movie_list, name='movie_list'),
    
    # 단일 영화 조회
    path('<int:movieid>/', views.movie_detail, name='movie_detail'),
    
    # GET : 특정 영화 전체 review 조회  /  POST : 특정 영화의 review 작성
    path('<int:movieid>/review/', views.review, name='review'),
    
    # GET : 특정 review 조회  /  PUT : 특정 review 수정  /  DELETE : 특정 review 삭제
    path('review/<int:review_pk>/', views.review_UD, name='review_UD'),
    
    # DB 에 저장되어 있는 영화 중 장르에 따라 10개(10개 미만일 수도 있음) 추천 
    path('recommend/<int:genre_pk>/', views.recommend10, name='recommend10'),
    # path('action10/', views.action10, name='action10'),
    # path('romance10/', views.romance10, name='romance10'),
    # path('fantasy10/', views.fantasy10, name='fantasy10'),
    # path('ani10/', views.ani10, name='ani10'),
    # path('drama10/', views.drama10, name='drama10'),
    # path('fear10/', views.fear10, name='fear10'),
    # path('comedy10/', views.comedy10, name='comedy10'),
    # path('history10/', views.history10, name='history10'),
    # path('west10/', views.west10, name='west10'),
    # path('thrill10/', views.thrill10, name='thrill10'),
    # path('crime10/', views.crime10, name='crime10'),
    # path('docu10/', views.docu10, name='docu10'),
    # path('sf10/', views.sf10, name='sf10'),
    # path('mystery10/', views.mystery10, name='mystery10'),
    # path('music10/', views.music10, name='music10'),
    # path('family10/', views.family10, name='family10'),
    # path('war10/', views.war10, name='war10'),
    # path('tvmovie10/', views.tvmovie10, name='tvmovie10'),

    # username 받으면 user의 pk 반환하기
    path('user/<str:username>/', views.wantuserpk, name='wantuserpk'),
    
    # username 받고 그 user가 좋아요, 싫어요 한 영화 출력
    path('user/<str:username>/like/', views.like, name='like'),
    
    # username 받고 그 user가 좋아요, 싫어요 한 댓글 출력
    path('user/<str:username>/like/review/', views.like_review, name='like_review'),


    # 초반 fixtures data 만들기 위한 경로
    path('get_movie_datas/', views.get_movie_datas, name='get_movie_datas'),
    path('get_genre/', views.get_genre, name='get_genre'),
    
]