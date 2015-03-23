# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0007_auto_20150322_1707'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pod',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='pod',
            name='url',
        ),
    ]
