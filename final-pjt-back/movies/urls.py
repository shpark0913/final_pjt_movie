from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_movie_datas),
    path('detail/', views.get_movie_datas, name='detail'),
]
