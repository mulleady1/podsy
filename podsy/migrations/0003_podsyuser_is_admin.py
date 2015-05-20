# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0002_tag_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='podsyuser',
            name='is_admin',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
