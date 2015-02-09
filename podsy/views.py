from django.shortcuts import render

from podsy.models import *

def home(request):
    pods = Pod.objects.all()
    return render(request, 'podsy/index.html', { 'pods': pods })
