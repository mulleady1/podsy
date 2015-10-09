# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '__first__'),
        ('messaging', '0003_message_conversation'),
    ]

    operations = [
        migrations.CreateModel(
            name='PodsyMessage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=150, blank=True)),
                ('email', models.EmailField(max_length=75)),
                ('subject', models.CharField(max_length=4, choices=[(b'sugg', b'Suggestion/feedback/demand'), (b'bug', b'Found a bug'), (b'crtr', b'Question about my podcast'), (b'othr', b'Something else')])),
                ('message', models.CharField(max_length=10000)),
                ('user', models.ForeignKey(to='podsy.PodsyUser', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
