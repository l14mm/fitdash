from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
import myfitnesspal
import logging
import datetime
from datetime import timedelta

class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer


class GetWeek(APIView):
    def get(self, request):
        client = myfitnesspal.Client('premiumliam')

        

        # endDate = datetime.date(2018, 7, 20)
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

        # weight = client.get_measurements('Weight')
        # weight = client.get_measurements('Weight', thisweek, lastweek)
        return Response(days)
