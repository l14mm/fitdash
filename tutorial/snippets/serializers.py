from rest_framework import serializers
from snippets.models import Mfp

class MfpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mfp
        fields = ('name', 'data')