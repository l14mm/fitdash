from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from snippets.models import Mfp, MfpData, Goals

class GoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goals
        fields = ('date', 'calories')

class MfpDataSerializer(serializers.ModelSerializer):
    goals = GoalsSerializer(many=True)
    class Meta:
        model = MfpData
        fields = ('date', 'goals')

    def create(self, validated_data):
        tracks_data = validated_data.pop('goals')
        album = MfpData.objects.create(**validated_data)
        for track_data in tracks_data:
            Goals.objects.create(album=album, **track_data)
        return album

class MfpSerializer(serializers.ModelSerializer):
    mfpData = MfpDataSerializer(many=True)
    class Meta:
        model = Mfp
        fields = ('username', 'mfpData')

    def create(self, validated_data):
        tracks_data = validated_data.pop('mfpData')
        album = Mfp.objects.create(**validated_data)
        for track_data in tracks_data:
            MfpData.objects.create(album=album, **track_data)
        return album