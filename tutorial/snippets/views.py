from snippets.models import Mfp
from snippets.serializers import MfpSerializer
from rest_framework import generics, authentication, exceptions, status
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import myfitnesspal
import logging
import datetime
from datetime import timedelta
import requests


def getMfpData():
    client = myfitnesspal.Client('premiumliam')

    endDate = datetime.datetime.now().date()
    startDate = endDate - timedelta(days=7)

    days = []

    while startDate < endDate:
        day = client.get_date(startDate)
        days.append({
            'date': day.date,
            'totals': day.totals,
            'goals': day.goals
        })
        startDate += timedelta(days=1)

    return days


class GetWeek(APIView):
    def get(self, response, *args, **kwargs):
        jwt = response.META.get('HTTP_JWT')

        url = 'http://localhost:3011/userDetails'
        headers = {'Authorization': 'bearer ' + jwt}
        r = requests.get(url, headers=headers)

        username = r.json()['username']
        userData = Mfp.objects.filter(username=username)
        
        if userData:
            serializer = MfpSerializer(userData, many=True)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            client = myfitnesspal.Client('premiumliam')

            endDate = datetime.datetime.now().date()
            startDate = endDate - timedelta(days=7)

            days = []

            while startDate < endDate:
                day = client.get_date(startDate)
                days.append({
                    'date': str(day.date),
                    'totals': day.totals,
                    'goals': day.goals
                })
                startDate += timedelta(days=1)

            data = {
                "username": username,
                "mfpData": days
            }

            serializer = MfpSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
