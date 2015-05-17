from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.views.generic import View, TemplateView, ListView
from podsy.models import *
import json

def getuser(request):
    return PodsyUser.objects.get(user=request.user)

def Json(data):
    return HttpResponse(json.dumps(data), content_type='application/json')

def home(request):
    if request.user.is_authenticated():
        u = getuser(request)
        loggedIn = 'true'
    else:
        u = {}
        loggedIn = 'false'

    pods = Pod.objects.all()
    favs = []
    if request.user.is_authenticated():
        u = getuser(request)
        favs = u.favoritePods.all()
    podsData = []
    for pod in pods:
        podData = pod.data
        podData['fav'] = pod in favs
        podsData.append(podData)

    context = {
        'podsData': json.dumps(podsData),
        'tagsData': json.dumps([tag.data for tag in Tag.objects.all()]),
        'categories': Category.objects.all(),
        'username': request.user.username,
        'loggedIn': loggedIn,
        'u': u
    }
    return render(request, 'podsy/index.html', context)

class SigninView(View):

    def post(self, request):
        idata = json.loads(request.body)
        u = idata.get('email')
        p = idata.get('password')
        user = authenticate(username=u, password=p)
        if user:
            login(request, user)
            odata = { 'success': True }
        else:
            odata = { 'success': False }

        return Json(odata)

class SignupView(View):

    def post(self, request):
        odata = {}
        try:
            idata = json.loads(request.body)
            u = idata.get('username')
            e = idata.get('email')
            p = idata.get('password')
            c = idata.get('passconfirm')

            if not (u and e and p and c):
                raise Exception('Please fill in all fields.')
            if p != c:
                raise Exception('Passwords must match.')

            try:
                tempuser = User.objects.get(username=u)
                raise Exception('Username already in use.')
            except ObjectDoesNotExist:
                pass

            try:
                tempuser = User.objects.get(email=e)
                raise Exception('Email already in use.')
            except ObjectDoesNotExist:
                pass

            user = User.objects.create_user(u, e, p)
            podsyUser = PodsyUser.objects.create(user=user)

            user = authenticate(username=u, password=p)
            login(request, user)

            odata['success'] = True
        except Exception as e:
            odata['success'] = False
            odata['message'] = e.message

        return Json(odata)

class SignoutView(View):

    def post(self, request):
        logout(request)
        return HttpResponseRedirect('/')


class PodView(View):
    favs = False

    def get(self, request, category_id=None):
        if self.favs:
            pods = getuser(request).favoritePods.all()
        elif category_id:
            pods = Pod.objects.filter(category_id=category_id)
        else:
            pods = Pod.objects.all()

        favs = []
        if request.user.is_authenticated():
            u = getuser(request)
            favs = u.favoritePods.all()

        odata = [{
            'id': pod.id,
            'audioUrl': pod.audio_url,
            'podcastUrl': pod.podcast_url,
            'name': pod.name,
            'category_id': pod.category.id,
            'category': pod.category.name,
            'fav': pod in favs,
            'upvotes': pod.upvotes,
            'downvotes': pod.downvotes,
            'tags': [{ 'id': tag.id, 'name': tag.name } for tag in pod.tags.all()]
        } for pod in pods]

        return Json(odata)

    def post(self, request):
        odata = {}
        if 'multipart/form-data' in request.META['CONTENT_TYPE']:
            form = UploadPodFileForm(request.POST, request.FILES)
            if form.is_valid():
                f = request.FILES['audio_file']
                with open(f.name, 'wb+') as destination:
                    for chunk in f.chunks():
                        destination.write(chunk)

                idata = form.data
                pod = Pod.objects.create(name=idata.get('name'), category_id=idata.get('category_id'), audio_url=f.name, user=getuser(request))
                if idata.get('tags'):
                    tags = []
                    for tag in idata.get('tags').split(','):
                        t = Tag.objects.get_or_create(name=tag)
                        tags.append(t[0])
                    pod.tags.add(*tags)
                    pod.save()

                odata['success'] = True
                odata['pod'] = pod.data
            else:
                odata['success'] = False
                odata['message'] = form.errors

        else:
            idata = json.loads(request.body)
            u = getuser(request)

            name = idata.get('name')
            category_id = idata.get('category_id')
            audio_file = idata.get('audio_file')
            podcast_url = idata.get('podcast_url')

            tags = []
            for tag in idata.get('tags'):
                t = Tag.objects.get_or_create(name=tag)
                tags.append(t[0])

            if name and category_id and audio_url and podcast_url:
                cat = Category.objects.get(pk=idata.get('category_id'))
                pod = Pod.objects.create(name=idata.get('name'), audio_url=idata.get('audio_url'), podcast_url=idata.get('podcast_url'), user=u, category=cat)
                if len(tags) > 0:
                    pod.tags.add(*tags)
                pod.save()
                odata['success'] = True
            else:
                odata['success'] = False

        return Json(odata)

    def put(self, request, pod_id=None):
        idata = json.loads(request.body)
        pod = Pod.objects.get(pk=idata.get('id'))
        fav = idata.get('fav')
        u = getuser(request)

        # Check for change in upvotes/downvotes.
        if idata.get('upToggled'):
            pod.upvotes += 1
        elif idata.get('downToggled'):
            pod.downvotes += 1
        if idata.get('upToggleRemoved'):
            pod.upvotes -= 1
        elif idata.get('downToggleRemoved'):
            pod.downvotes -= 1

        # Check for change in favorite status.
        if fav and pod not in u.favoritePods.all():
            u.favoritePods.add(pod)
        elif not fav and pod in u.favoritePods.all():
            u.favoritePods.remove(pod)

        pod.save()
        odata = {
            'success': True,
            'pod': pod.data
        }

        return Json(odata)

class CategoryView(View):

    def get(self, request):
        odata = [{
            'id': cat.id,
            'name': cat.name,
            'description': cat.description
        } for cat in Category.objects.all()]

        return Json(odata)

    def post(self, request):
        idata = json.loads(request.body)
        name = idata.get('name')
        description = idata.get('description')
        if name and description:
            cat = Category(name=name, description=description)
            cat.save()
            odata = { 'success': True }
        else:
            odata = { 'success': False }

        return Json(odata)

class CommentView(View):

    def get(self, request, comment_id=None, pod_id=None):
        if comment_id:
            comments = [Comment.objects.get(pk=comment_id)]
        elif pod_id:
            pod = Pod.objects.get(pk=pod_id)
            comments = Comment.objects.filter(pod=pod, parent=None)
        else:
            comments = Comment.objects.all()

        odata = [comment.data for comment in comments]

        return Json(odata)

    def post(self, request, pod_id):
        idata = json.loads(request.body)
        text = idata.get('text')
        parent_id = idata.get('parent_id')
        if parent_id:
            comment = Comment(pod_id=pod_id, parent_id=parent_id, user=getuser(request), text=text)
        else:
            comment = Comment(pod_id=pod_id, user=getuser(request), text=text)
        comment.save()

        odata = {
            'success': True,
            'comment': comment.data
        }

        return Json(odata)

    def put(self, request):
        idata = json.loads(request.body)
        comment = Comment.objects.get(pk=idata.get('id'))
        comment.text = idata.get('text')
        comment.save()

        odata = {
            'success': True,
            'comment': comment.data
        }

        return Json(odata)

class TagView(View):

    def get(self, request, tag_name=None):
        tag = Tag.objects.get(name=tag_name)
        pods = Pod.objects.filter(tags__name=tag_name)

        odata = tag.data
        odata['pods'] = [pod.data for pod in pods]

        return Json(odata)

    def post(self, request, pod_id):
        idata = json.loads(request.body)
        text = idata.get('text')
        parent_id = idata.get('parent_id')
        if parent_id:
            comment = Comment(pod_id=pod_id, parent_id=parent_id, user=getuser(request), text=text)
        else:
            comment = Comment(pod_id=pod_id, user=getuser(request), text=text)
        comment.save()

        odata = {
            'success': True,
            'tag': tag.data
        }

        return Json(odata)

    def put(self, request):
        idata = json.loads(request.body)
        tag = Tag.objects.get(pk=idata.get('id'))
        tag.name = idata.get('name')
        tag.description = idata.get('description')
        tag.save()

        odata = {
            'success': True,
            'tag': tag.data
        }

        return Json(odata)
