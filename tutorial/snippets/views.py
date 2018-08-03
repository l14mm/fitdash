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
    def post(self, request, *args, **kwargs):
        # print(request.data)

        # mfpData = getMfpData()
        # return Response(mfpData)

        # serializer = MfpSerializer(data=request.data)
        data = {
            'username': 'youvegotliam',
            'tracks': [
                {'date': '10', 'calories': 245},
                {'date': '11', 'calories': 264},
                {'date': '12', 'calories': 159},
            ],
        }
        serializer = MfpSerializer(data=data)


        # queryset = Mfp.objects.all()
        # queryset = queryset.filter(artist='Danger Mouse')
        # # data = Mfp.objects.filter(name=username)
        # # serializer = MfpSerializer(data, many=True)
        # print(queryset)
        # return Response("hey")

        if serializer.is_valid():
            serializer.save()

            queryset = Mfp.objects.all()
            queryset = queryset.filter(username='youvegotliam')
            serializer = MfpSerializer(queryset, many=True)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print('error')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, response, *args, **kwargs):
        username = self.kwargs['username']
        jwt = response.META.get('HTTP_JWT')

        url = 'http://localhost:3011/userDetails'
        headers = {'Authorization': 'bearer ' + jwt}
        r = requests.get(url, headers=headers)

        data = 0
        # data = Mfp.objects.filter(username=username)

        # If databse contains data for selected username, return that data, else get from mfp service
        if data:
            serializer = MfpSerializer(data, many=True)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # client = myfitnesspal.Client('premiumliam')

            # endDate = datetime.datetime.now().date()
            # startDate = endDate - timedelta(days=7)

            # days = []

            # while startDate < endDate:
            #     day = client.get_date(startDate)
            #     days.append({
            #         'date': day.date,
            #         'totals': day.totals,
            #         'goals': day.goals
            #     })
            #     startDate += timedelta(days=1)

            data = {
                "username": "youvegotliam",
                "mfpData": [
                    {
                        "date": "10",
                        "calories": 245
                    },
                ]
            }

            data = {
                "username": "youvegotliam",
                "mfpData": [
                    {
                        "date": "2018-07-27",
                        "goals": [{
                            "date": "10",
                            "calories": 245
                            # "fiber": 0,
                            # "carbohydrates": 0,
                            # "calories": 0,
                            # "fat": 0,
                            # "sugar": 0,
                            # "protein": 0
                        }]
                        # "totals": {
                        #     "fiber": 24,
                        #     "carbohydrates": 343,
                        #     "calories": 2286,
                        #     "fat": 42,
                        #     "sugar": 23,
                        #     "protein": 142
                        # }
                    }
                ]
            }

            serializer = MfpSerializer(data=data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)