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

def pods(request):
    pods = [{
        'id': pod.id,
        'url': pod.url,
        'name': pod.name,
        'category': pod.subcategory.category.name,
        'subcategory': pod.subcategory.name
    } for pod in Pod.objects.all()]
    return HttpResponse(json.dumps(pods), content_type='application/json')

def categories(request):
    categories = [{ 'name': cat.name, 'description': cat.description } for cat in Category.objects.all()]
    return HttpResponse(json.dumps(categories), content_type='application/json')

def podsBySubcategory(request, subcategory_id):
    print 'podsBySubcategory subcategory_id = %s' % subcategory_id
    pods = [{
        'id': pod.id,
        'url': pod.url,
        'name': pod.name,
        'category': pod.subcategory.category.name,
        'subcategory': pod.subcategory.name
    } for pod in Pod.objects.filter(subcategory_id=subcategory_id)]
    return HttpResponse(json.dumps(pods), content_type='application/json')
