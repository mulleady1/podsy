from django.db import models
from django.forms import ModelForm
from podsy.models import *

class Message(models.Model):
    from_user = models.ForeignKey(PodsyUser, related_name='messagefrom')
    to_user = models.ForeignKey(PodsyUser, related_name='messageto')
    text = models.CharField(max_length=100000)
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    @property
    def data(self):
        return {
            'fromUser': self.from_user.shallow_data,
            'toUser': self.to_user.shallow_data,
            'text': self.text,
            'preview': self.text[:30] if len(self.text) >= 30 else self.text,
            'created': self.created.strftime('%b %d').replace(' 0', ' '),
        }


class MessageForm(ModelForm):
    class Meta:
        model = Message
        fields = ['to_user', 'text']
