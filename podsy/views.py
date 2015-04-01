from django.contrib.auth import authenticate
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.generic import View, TemplateView, ListView
from podsy.models import *
import json

def home(request):
    context = {
        'pods': Pod.objects.all(),
        'categories': Category.objects.all(),
        'subcategories': Subcategory.objects.all(),
        'username': request.session.get('username', ''),
        'loggedIn': 'true' if request.session.get('username') else 'false'
    }
    return render(request, 'podsy/index.html', context)

def signin(request):
    u = request.POST['email']
    p = request.POST['password']
    user = authenticate(username=u, password=p)
    if user:
        request.session['user_id'] = user.id
        request.session['username'] = user.username
        data = { 'success': True }
    else:
        data = { 'success': False }

    return HttpResponse(json.dumps(data), content_type='application/json')

class PodView(View):

    def get(self, request, subcategory_id=None):
        if subcategory_id:
            pods = Pod.objects.filter(subcategory_id=subcategory_id)
        else:
            pods = Pod.objects.all()

        data = [{
            'id': pod.id,
            'audioUrl': pod.audio_url,
            'podcastUrl': pod.podcast_url,
            'name': pod.name,
            'category_id': pod.subcategory.category.id,
            'category': pod.subcategory.category.name,
            'subcategory_id': pod.subcategory.id,
            'subcategory': pod.subcategory.name
        } for pod in pods]

        return HttpResponse(json.dumps(data), content_type='application/json')

    def post(self, request):
        form = request.POST
        if form.get('name') and form.get('category_id') and form.get('audio_file'):
            cat = Category.objects.get(pk=form.get('category_id'))
            pod = Pod(name=form.get('name'), audio_file=form.get('audio_file'), user_id=request.session['user_id'], category=cat)
            pod.save()
            data = { 'success': True }
        elif form.get('name') and form.get('category_id') and form.get('audio_url') and form.get('podcast_url'):
            cat = Category.objects.get(pk=form.get('category_id'))
            pod = Pod(name=form.get('name'), audio_url=form.get('audio_url'), podcast_url=form.get('podcast_url'), user_id=request.session['user_id'], category=cat)
            pod.save()
            data = { 'success': True }
        else:
            data = { 'success': False }

        return HttpResponse(json.dumps(data), content_type='application/json')

    def put(self, request, pod_id=None):
        data = request.PUT

        return HttpResponse(json.dumps(data), content_type='application/json')

class CategoryView(View):
    
    def get(self, request):
        data = [{
            'id': cat.id,
            'name': cat.name,
            'description': cat.description
        } for cat in Category.objects.all()]

        return HttpResponse(json.dumps(data), content_type='application/json')

    def post(self, request):
        form = request.POST
        name = form.get('name')
        description = form.get('description')
        if name and description:
            cat = Category(name=name, description=description)
            cat.save()
            data = { 'success': True }
        else:
            data = { 'success': False }

        return HttpResponse(json.dumps(data), content_type='application/json')
