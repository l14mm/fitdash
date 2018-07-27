from django.db import models
from rest_framework.serializers import JSONField
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from datetime import datetime

class Mfp(models.Model):
    name = models.TextField()
    data = JSONField(null=True, blank=True)

    class Meta:
        ordering = ('name',)