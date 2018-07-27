from snippets.models import Mfp
from snippets.serializers import MfpSerializer
from rest_framework import generics, authentication, exceptions
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

class GetWeek(APIView):
    def get(self, response, *args, **kwargs):
        username = self.kwargs['username']
        jwt = response.META.get('HTTP_JWT')


        data = Mfp.objects.all()
        # print(data.data)
        d = MfpSerializer(data)
        print(d.data)
        # return JsonResponse(data, safe=False)
        return Response('s')



        url = 'http://localhost:3000/userDetails'
        headers = {'Authorization': 'bearer ' + jwt}
        r = requests.get(url, headers=headers)
        
        data = Mfp.objects.filter(name=username)

        # If databse contains data for selected username, return that data, else get from mfp service
        if data:
            serializer = MfpSerializer(data, many=True)
            return JsonResponse(serializer.data, safe=False, status=201)
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

            # mfp = Mfp(name=username)
            # mfp.save()
            data = Mfp.objects.filter(name='liam') 
                    
            # return JsonResponse(mfp, safe=False, status=201)
            return Response(data)