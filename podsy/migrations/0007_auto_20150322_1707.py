# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0006_auto_20150316_1940'),
    ]

    operations = [
        migrations.AddField(
            model_name='pod',
            name='audio_url',
            field=models.URLField(blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pod',
            name='host_url',
            field=models.URLField(blank=True),
            preserve_default=True,
        ),
    ]
