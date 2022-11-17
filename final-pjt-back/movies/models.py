from django.db import models

# Create your models here.

class Genre(models.Model):
    genreid = models.IntegerField(primary_key=True)
    name = models.TextField()

class Movie(models.Model):
    title = models.CharField(max_length=100)
    release_date = models.DateField()
    vote_average = models.FloatField()
    overview = models.TextField()
    poster_path = models.CharField(max_length=200)
    movieid = models.IntegerField(primary_key=True)
    backdrop_path = models.CharField(max_length=200)
    # genres = models.TextField()
    genres = models.ManyToManyField(Genre)
