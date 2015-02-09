# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podsyuser',
            name='favoriteCategories',
            field=models.ManyToManyField(to='podsy.Category', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='podsyuser',
            name='favoritePods',
            field=models.ManyToManyField(to='podsy.Pod', blank=True),
            preserve_default=True,
        ),
    ]
