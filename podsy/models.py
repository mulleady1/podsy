from django.db import models
from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm

class PodsyUser(models.Model):
    user = models.OneToOneField(User)
    favoritePods = models.ManyToManyField('Pod', blank=True)
    favoriteTags = models.ManyToManyField('Tag', blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)
    is_admin = models.BooleanField(default=False)

    @property
    def username(self):
        return self.user.username

    def __str__(self):
        return self.username

class Pod(models.Model):
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
