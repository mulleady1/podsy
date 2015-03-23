from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from podsy.models import *
import json

def home(request):
    context = {
        'pods' : Pod.objects.all(),
        'categories' : Category.objects.all(),
        'subcategories' : Subcategory.objects.all()
    }
    return render(request, 'podsy/index.html', context)

def pods(request, subcategory_id=None):
    if subcategory_id:
        pods = Pod.objects.filter(subcategory_id=subcategory_id)
    else:
        pods = Pod.objects.all()

    data = [{
        'id': pod.id,
        'audioUrl': pod.audio_file_url,
        'podcastUrl': pod.podcast_url,
        'name': pod.name,
        'category': pod.subcategory.category.name,
        'subcategory': pod.subcategory.name
    } for pod in pods]

    return HttpResponse(json.dumps(data), content_type='application/json')

def categories(request):
    categories = [{ 'name': cat.name, 'description': cat.description } for cat in Category.objects.all()]
    return HttpResponse(json.dumps(categories), content_type='application/json')
