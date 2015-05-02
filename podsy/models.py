from django.db import models
from django.contrib.auth.models import User
from django.forms import ModelForm

class PodsyUser(models.Model):
    user = models.OneToOneField(User)
    favoritePods = models.ManyToManyField('Pod', blank=True)
    favoriteCategories = models.ManyToManyField('Subcategory', blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

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
    subcategory = models.ForeignKey('Subcategory')
    tags = models.ManyToManyField('Tag', blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

class Subcategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    category = models.ForeignKey('Category')
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=25)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

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
            'children': childrenData
        }

class PodForm(ModelForm):
    class Meta:
        model = Pod
        fields = ['name', 'podcast_url', 'audio_url', 'user', 'subcategory']
