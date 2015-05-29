from django.db import models
from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm

from datetime import date, timedelta
from itertools import chain

class PodsyUser(models.Model):
    user = models.OneToOneField(User)
    favoritePods = models.ManyToManyField('Pod', blank=True)
    favoriteTags = models.ManyToManyField('Tag', blank=True)
    upvotedPods = models.ManyToManyField('Pod', blank=True, related_name='upvoted')
    downvotedPods = models.ManyToManyField('Pod', blank=True, related_name='downvoted')
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)
    is_admin = models.BooleanField(default=False)

    @property
    def username(self):
        return self.user.username

    @property
    def data(self):
        return {
            'id': self.id,
            'username': self.username,
            'pods': [pod.data for pod in Pod.objects.filter(user=self)]
        }

    def __str__(self):
        return self.username

class PodManager(models.Manager):
    def front_page(self):
        #import ipdb; ipdb.set_trace()
        yesterday = date.today() - timedelta(1)
        lastWeek = date.today() - timedelta(7)
        lastMonth = date.today() - timedelta(30)
        lastYear = date.today() - timedelta(365)
        dayPods = self.filter(created__gte=yesterday).order_by('-upvotes', 'downvotes')
        weekPods = self.filter(created__gte=lastWeek).order_by('-upvotes', 'downvotes')
        monthPods = self.filter(created__gte=lastMonth).order_by('-upvotes', 'downvotes')
        yearPods = self.filter(created__gte=lastYear).order_by('-upvotes', 'downvotes')
        return list(chain(dayPods, weekPods, monthPods, yearPods))

class Pod(models.Model):
    objects = PodManager()
    name = models.CharField(max_length=1000)
    podcast_url = models.URLField(blank=True)
    audio_url = models.URLField(blank=True)
    audio_file = models.BinaryField(blank=True)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    user = models.ForeignKey('PodsyUser')
    category = models.ForeignKey('Category')
    tags = models.ManyToManyField('Tag', blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    @property
    def data(self):
        return {
            'id': self.id,
            'audioUrl': self.audio_url,
            'podcastUrl': self.podcast_url,
            'name': self.name,
            'category_id': self.category.id,
            'category': self.category.name,
            'upvotes': self.upvotes,
            'downvotes': self.downvotes,
            'created': self.created.strftime('%Y-%m-%d'),
            'createdLabel': self.created.strftime('%b %d'),
            'points': self.upvotes - self.downvotes,
            'user': self.user.username,
            'tags': [tag.data for tag in self.tags.all()]
        }

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=100)
    url = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=1000, blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    @property
    def data(self):
        return {
            'id': self.id,
            'name': self.name,
            'label': self.name, # For jquery autocomplete
            'description': self.description
        }

    def __str__(self):
        return self.name

class Comment(models.Model):
    pod = models.ForeignKey('Pod')
    user = models.ForeignKey('PodsyUser')
    parent = models.ForeignKey('Comment', null=True, blank=True)
    text = models.CharField(max_length=10000)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    @property
    def data(self):
        children = Comment.objects.filter(parent=self)
        childrenData = [child.data for child in children]
        return {
            'id': self.id,
            'text': self.text,
            'userid': self.user.id,
            'username': self.user.username,
            'timestamp': self.created.strftime('%b %d').replace(' 0', ' '),
            'children': childrenData
        }

    def __str__(self):
        return self.text

class PodForm(ModelForm):
    class Meta:
        model = Pod
        fields = ['name', 'podcast_url', 'audio_url', 'user', 'category']

class UploadPodFileForm(forms.Form):
    name = forms.CharField(max_length=1000)
    category_id = forms.IntegerField()
    audio_file = forms.FileField()
    tags = forms.CharField(max_length=1000, required=False)
