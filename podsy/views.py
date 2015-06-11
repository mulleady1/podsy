from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.views.generic import View, TemplateView, ListView
from django.conf import settings
from podsy.models import *
import os
import json

def getuser(request):
    try:
        return PodsyUser.objects.get(user=request.user)
    except:
        return False

def Json(data):
    return HttpResponse(json.dumps(data), content_type='application/json')

def JsonAuthErr():
    data = { 'success': False, 'message': 'Not logged in.' }
    return HttpResponse(json.dumps(data), content_type='application/json')

def home(request):
    if request.user.is_authenticated():
        u = getuser(request)
        loggedIn = 'true'
        favs = u.favoritePods.all()
        upToggled = u.upvotedPods.all()
        downToggled = u.downvotedPods.all()
    else:
        u = {}
        loggedIn = 'false'
        favs = []
        upToggled = []
        downToggled = []

    podsData = []
    pods = Pod.objects.front_page()
    for pod in pods:
        podData = pod.data
        podData['fav'] = pod in favs
        podData['upToggled'] = pod in upToggled
        podData['downToggled'] = pod in downToggled
        podsData.append(podData)

    context = {
        'podsData': json.dumps(podsData),
        'tagsData': json.dumps([tag.data for tag in Tag.objects.all()]),
        'categories': Category.objects.all(),
        'username': request.user.username,
        'loggedIn': loggedIn,
        'user': u
    }

    return render(request, 'podsy/index.html', context)

class SigninView(View):

    def post(self, request):
        idata = json.loads(request.body)
        u = idata.get('username')
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

    def get(self, request, category_name=None):
        if self.favs:
            pods = getuser(request).favoritePods.all()
        elif category_name:
            pods = Pod.objects.filter(category__name__iexact=category_name)
        else:
            pods = Pod.objects.all()

        favs = []
        upToggled = []
        downToggled = []
        if request.user.is_authenticated():
            u = getuser(request)
            favs = u.favoritePods.all()
            upToggled = u.upvotedPods.all()
            downToggled = u.downvotedPods.all()

        odata = []
        for pod in pods:
            data = pod.data
            data['fav'] = pod in favs
            data['upToggled'] = pod in upToggled
            data['downToggled'] = pod in downToggled
            odata.append(data)

        return Json(odata)

    def post(self, request):
        odata = {}
        if 'multipart/form-data' in request.META['CONTENT_TYPE']:
            form = UploadPodFileForm(request.POST, request.FILES)
            if form.is_valid():
                idata = form.data
                f = request.FILES['audio_file']
                rel_path = os.path.join('static/audio', f.name)
                path = os.path.join(os.getcwd(), rel_path)
                with open(path, 'wb+') as destination:
                    for chunk in f.chunks():
                        destination.write(chunk)

                pod = Pod.objects.create(name=idata.get('name'), category_id=idata.get('category_id'), audio_url=rel_path, user=getuser(request))
                if idata.get('tags'):
                    tags = []
                    for tag in idata.get('tags').split(','):
                        t = Tag.objects.get_or_create(name=tag.lower())
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
            audio_url = idata.get('audio_url')
            podcast_url = idata.get('podcast_url')

            tags = []
            for tag in idata.get('tags'):
                t = Tag.objects.get_or_create(name=tag.lower())
                tags.append(t[0])

            if name and category_id and audio_url and podcast_url:
                cat = Category.objects.get(pk=idata.get('category_id'))
                pod = Pod.objects.create(name=idata.get('name'), audio_url=idata.get('audio_url'), podcast_url=idata.get('podcast_url'), user=u, category=cat)
                if len(tags) > 0:
                    pod.tags.add(*tags)
                pod.save()

                odata['success'] = True
                odata['pod'] = pod.data
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
            u.upvotedPods.add(pod)
        elif idata.get('downToggled'):
            pod.downvotes += 1
            u.downvotedPods.add(pod)
        if idata.get('upToggleRemoved'):
            pod.upvotes -= 1
            u.upvotedPods.remove(pod)
        elif idata.get('downToggleRemoved'):
            pod.downvotes -= 1
            u.downvotedPods.remove(pod)

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
            'id': comment.id
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
    favs = False

    def get(self, request, tag_name=None):
        if self.favs:
            u = getuser(request)
            if not u:
                return JsonAuthErr()

            tags = u.favoriteTags.all()
            odata = []
            for tag in tags:
                data = tag.data
                data['fav'] = True
                odata.append(data)
        elif tag_name:
            tag = Tag.objects.get(name=tag_name.lower())
            pods = Pod.objects.filter(tags__name=tag_name)
            odata = tag.data
            odata['pods'] = []
            for pod in pods:
                data = pod.data
                if request.user.is_authenticated():
                    data['upToggled'] = pod in getuser(request).upvotedPods.all()
                    data['downToggled'] = pod in getuser(request).downvotedPods.all()
                odata['pods'].append(data)
        else:
            u = getuser(request)
            favs = []
            upToggled = []
            downToggled = []
            if u:
                favs = u.favoriteTags.all()
            tags = Tag.objects.all()
            odata = []
            for tag in tags:
                data = tag.data
                data['fav'] = tag in favs
                odata.append(data)

        return Json(odata)

    def post(self, request, tag_name):
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

    def put(self, request, tag_id=None, tag_name=None):
        idata = json.loads(request.body)
        u = getuser(request)
        if not u:
            return JsonAuthErr()

        tag = Tag.objects.get(pk=tag_id)
        tag.name = idata.get('name')
        tag.description = idata.get('description')
        fav = idata.get('fav')

        if not fav and tag in u.favoriteTags.all():
            u.favoriteTags.remove(tag)
        elif fav and not tag in u.favoriteTags.all():
            u.favoriteTags.add(tag)

        tag.save()

        odata = {
            'success': True,
            'tag': tag.data
        }

        return Json(odata)

    def delete(self, request, tag_name):
        tag = Tag.objects.get(name=tag_name.lower())
        tag.delete()
        odata = { 'success': True }
        return Json(odata)

class UserView(View):

    def get(self, request, username=None):
        if username:
            user = PodsyUser.objects.get(user__username=username)
            odata = user.data
        else:
            users = PodsyUser.objects.all()
            odata = [user.data for user in users]

        return Json(odata)
