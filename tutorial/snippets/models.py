from django.db import models
from rest_framework.serializers import JSONField
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from datetime import datetime

class Mfp(models.Model):
    username = models.CharField(max_length=100)

class Goals(models.Model):
    fiber = models.IntegerField()
    carbohydrates = models.IntegerField()
    calories = models.IntegerField()
    fat = models.IntegerField()
    sugar = models.IntegerField()
    protein = models.IntegerField()

class Totals(models.Model):
    fiber = models.IntegerField()
    carbohydrates = models.IntegerField()
    calories = models.IntegerField()
    fat = models.IntegerField()
    sugar = models.IntegerField()
    protein = models.IntegerField()

class MfpData(models.Model):
    album = models.ForeignKey(Mfp, related_name='mfpData', on_delete=models.CASCADE)
    date = models.CharField(max_length=100)
    goals = models.OneToOneField(Goals, None)
    totals = models.OneToOneField(Totals, None)

    class Meta:
        ordering = ['date']



class MfpMeals(models.Model):
    username = models.CharField(max_length=100)

class Days(models.Model):
    album = models.ForeignKey(MfpMeals, related_name='mfpData', on_delete=models.CASCADE)
    date = models.CharField(max_length=100)
    # meals = models.OneToOneField(Meals)
    goals = models.OneToOneField(Goals, None)
    totals = models.OneToOneField(Totals, None)

    class Meta:
        ordering = ['date']

class Meals(models.Model):
    album = models.ForeignKey(Days, related_name='meals', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ['name']

class Entries(models.Model):
    album = models.ForeignKey(Meals, related_name='entries', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    totals = models.OneToOneField(Totals, None)

    class Meta:
        ordering = ['name']