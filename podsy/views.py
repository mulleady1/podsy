from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from podsy.models import *
import json

def home(request):
    pods = Pod.objects.all()
    return render(request, 'podsy/index.html', { 'pods': pods })

def pods(request):
    pods = [{ 'url': pod.url, 'name': pod.name } for pod in Pod.objects.all()]
    return HttpResponse(json.dumps(pods), content_type='application/json')

