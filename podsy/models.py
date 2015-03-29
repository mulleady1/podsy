from django.db import models
from django.contrib.auth.models import User
from django.forms import ModelForm

class PodsyUser(models.Model):
    user = models.OneToOneField(User)
    favoritePods = models.ManyToManyField('Pod', blank=True)
    favoriteCategories = models.ManyToManyField('Category', blank=True)

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

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

class PodForm(ModelForm):
    class Meta:
        model = Pod
        fields = ['name', 'podcast_url', 'audio_url', 'user', 'category']
