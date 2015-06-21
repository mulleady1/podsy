from django.db import models
from django.forms import ModelForm
from podsy.models import *

class Conversation(models.Model):
    members = models.ManyToManyField(PodsyUser)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    @property
    def data(self):
        messages = Message.objects.filter(conversation=self).order_by('-created')
        preview = ''
        if len(messages) > 0:
            preview = messages[0].preview
        return {
            'id': self.id,
            'members': [member.shallow_data for member in self.members.all()],
            'created': self.created.strftime('%b %d').replace(' 0', ' '),
            'preview': preview,
            'messages': [message.data for message in messages]
        }

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
    def preview(self):
        return self.text[:30] if len(self.text) >= 30 else self.text

    @property
    def data(self):
        return {
            'id': self.id,
            'user': self.user.shallow_data,
            'text': self.text,
            'preview': self.preview,
            'created': self.created.strftime('%b %d').replace(' 0', ' '),
        }

    def __str__(self):
        return self.text
