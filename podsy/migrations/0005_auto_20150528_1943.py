# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0004_podsyuser_favoritetags'),
    ]

    operations = [
        migrations.AddField(
            model_name='podsyuser',
            name='downvotedPods',
            field=models.ManyToManyField(related_name='downvoted', to='podsy.Pod', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='podsyuser',
            name='upvotedPods',
            field=models.ManyToManyField(related_name='upvoted', to='podsy.Pod', blank=True),
            preserve_default=True,
        ),
    ]
