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
    goals = models.OneToOneField(Goals)
    totals = models.OneToOneField(Totals)

    class Meta:
        ordering = ['date']