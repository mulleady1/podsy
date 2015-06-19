from django.db import models
from django.forms import ModelForm
from podsy.models import *

class Conversation(models.Model):
    members = models.ManyToManyField(PodsyUser)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self):
        names = [member.username for member in self.members.all()]
        return 'Conversation started on %s with %s' % (str(self.created), ', '.join(names))

class Message(models.Model):
    conversation = models.ForeignKey('Conversation')
    user = models.ForeignKey(PodsyUser)
    text = models.CharField(max_length=100000)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    @property
    def data(self):
        return {
            'id': self.id,
            'fromUser': self.from_user.shallow_data,
            'toUser': self.to_user.shallow_data,
            'text': self.text,
            'preview': self.text[:30] if len(self.text) >= 30 else self.text,
            'created': self.created.strftime('%b %d').replace(' 0', ' '),
        }

    def __str__(self):
        return self.text
