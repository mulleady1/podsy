from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
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
        'username': request.user.username,
        'loggedIn': 'true' if request.user.is_authenticated() else 'false'
    }
    return render(request, 'podsy/index.html', context)

class SigninView(View):

    def post(self, request):
        u = request.POST['email']
        p = request.POST['password']
        user = authenticate(username=u, password=p)
        if user:
            login(request, user)
            data = { 'success': True }
        else:
            data = { 'success': False }

        return HttpResponse(json.dumps(data), content_type='application/json')

class SignupView(View):

    def post(self, request):
        u = request.POST['username']
        e = request.POST['email']
        p = request.POST['password']
        user = User.objects.create_user(u, e, p)
        podsyUser = PodsyUser(user=user)
        podsyUser.save()

        user = authenticate(username=u, password=p)
        login(request, user)
        return HttpResponseRedirect('/')

class SignoutView(View):

    def post(self, request):
        logout(request)
        return HttpResponseRedirect('/')


class PodView(View):
    favs = False

    def get(self, request, category_id=None, subcategory_id=None):
        if self.favs:
            pods = PodsyUser.objects.get(user=request.user).favoritePods.all()
        elif category_id:
            pods = Pod.objects.filter(subcategory__category_id=category_id)
        elif subcategory_id:
            pods = Pod.objects.filter(subcategory_id=subcategory_id)
        else:
            pods = Pod.objects.all()

        favs = []
        if request.user.is_authenticated():
            u = PodsyUser.objects.get(user=request.user)
            favs = u.favoritePods.all()

        data = [{
            'id': pod.id,
            'audioUrl': pod.audio_url,
            'podcastUrl': pod.podcast_url,
            'name': pod.name,
            'category_id': pod.subcategory.category.id,
            'category': pod.subcategory.category.name,
            'subcategory_id': pod.subcategory.id,
            'subcategory': pod.subcategory.name,
            'fav': pod in favs,
            'upvotes': pod.upvotes,
            'downvotes': pod.downvotes
        } for pod in pods]

        return HttpResponse(json.dumps(data), content_type='application/json')

    def post(self, request):
        form = request.POST
        u = PodsyUser.objects.get(user=request.user)
        if form.get('name') and form.get('subcategory_id') and form.get('audio_file'):
            cat = Subcategory.objects.get(pk=form.get('subcategory_id'))
            pod = Pod(name=form.get('name'), audio_file=form.get('audio_file'), user=u, subcategory=cat)
            pod.save()
            data = { 'success': True }
        elif form.get('name') and form.get('subcategory_id') and form.get('audio_url') and form.get('podcast_url'):
            cat = Subcategory.objects.get(pk=form.get('subcategory_id'))
            pod = Pod(name=form.get('name'), audio_url=form.get('audio_url'), podcast_url=form.get('podcast_url'), user=u, subcategory=cat)
            pod.save()
            data = { 'success': True }
        else:
            data = { 'success': False }

        return HttpResponse(json.dumps(data), content_type='application/json')

    def put(self, request, pod_id=None):
        data = json.loads(request.body)
        pod = Pod.objects.get(pk=data.get('id'))
        fav = data.get('fav')
        u = PodsyUser.objects.get(user=request.user)

        # Check for change in upvotes/downvotes.
        if data.get('upToggled'):
            pod.upvotes += 1
        elif data.get('downToggled'):
            pod.downvotes += 1
        if data.get('upToggleRemoved'):
            pod.upvotes -= 1
        elif data.get('downToggleRemoved'):
            pod.downvotes -= 1

        # Check for change in favorite status.
        if fav and pod not in u.favoritePods.all():
            u.favoritePods.add(pod)
        elif not fav and pod in u.favoritePods.all():
            u.favoritePods.remove(pod)

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

class SubcategoryView(View):

    def get(self, request):
        data = [{
            'id': cat.id,
            'name': cat.name,
            'description': cat.description
        } for cat in Subcategory.objects.all()]

        return HttpResponse(json.dumps(data), content_type='application/json')

    def post(self, request):
        form = request.POST
        name = form.get('name')
        description = form.get('description')
        if name and description:
            cat = Subcategory(name=name, description=description)
            cat.save()
            data = { 'success': True }
        else:
            data = { 'success': False }

        return HttpResponse(json.dumps(data), content_type='application/json')
