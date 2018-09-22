FROM python:3.6

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
ADD . /app

RUN python3 -m pip install -r requirements.txt
RUN python tutorial/manage.py makemigrations
RUN python tutorial/manage.py migrate

ADD . /app