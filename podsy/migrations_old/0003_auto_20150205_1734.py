# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0002_auto_20150205_1731'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pod',
            name='image_url',
            field=models.CharField(default='', max_length=1000, blank=True),
            preserve_default=False,
        ),
    ]
