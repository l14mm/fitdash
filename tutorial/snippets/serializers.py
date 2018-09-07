from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from snippets.models import Mfp, MfpData, Goals, Totals

class GoalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goals
        fields = ('fiber', 'carbohydrates', 'calories', 'fat', 'sugar', 'protein')

class TotalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Totals
        fields = ('fiber', 'carbohydrates', 'calories', 'fat', 'sugar', 'protein')

class MfpDataSerializer(serializers.ModelSerializer):
    goals = GoalsSerializer()
    totals = TotalsSerializer()
    class Meta:
        model = MfpData
        fields = ('date', 'goals', 'totals')

class MfpSerializer(serializers.ModelSerializer):
    mfpData = MfpDataSerializer(many=True)
    class Meta:
        model = Mfp
        fields = ('username', 'mfpData')

    def create(self, validated_data):
        tracks_data = validated_data.pop('mfpData')
        mfp = Mfp.objects.create(**validated_data)
        for track_data in tracks_data:
            goals = track_data.pop('goals')
            totals = track_data.pop('totals')
            goals = Goals.objects.create(**goals)
            totals = Totals.objects.create(**totals)
            mfpData = MfpData.objects.create(album=mfp, goals=goals, totals=totals, **track_data)
        return mfp





class EntriesSerializer(serializers.ModelSerializer):
    totals = TotalsSerializer()
    class Meta:
        model = MfpData
        fields = ('name', 'totals')

class MealsSerializer(serializers.ModelSerializer):
    entries = EntriesSerializer(many=True)
    class Meta:
        model = MfpData
        fields = ('entries', 'name')

class DaysSerializer(serializers.ModelSerializer):
    meals = MealsSerializer(many=True)
    goals = GoalsSerializer()
    totals = TotalsSerializer()
    class Meta:
        model = MfpData
        fields = ('date', 'meals', 'goals', 'totals')

class MfpMealsSerializer(serializers.ModelSerializer):
    mfpData = MfpDataSerializer(many=True)
    class Meta:
        model = Mfp
        fields = ('username', 'days')

    def create(self, validated_data):
        days = validated_data.pop('days')
        mfp = MfpMeals.objects.create(**validated_data)
        for day in days:
            meals = day.pop('meals')
            goals = day.pop('goals')
            totals = day.pop('totals')
            meals = Goals.objects.create(**meals)
            goals = Goals.objects.create(**goals)
            totals = Totals.objects.create(**totals)
            mfpData = MfpData.objects.create(mfp=mfp, meals=meals, goals=goals, totals=totals, **day)
        return mfp