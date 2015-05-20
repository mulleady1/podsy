# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0003_podsyuser_is_admin'),
    ]

    operations = [
        migrations.AddField(
            model_name='podsyuser',
            name='favoriteTags',
            field=models.ManyToManyField(to='podsy.Tag', blank=True),
            preserve_default=True,
        ),
    ]
