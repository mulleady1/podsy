# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0005_auto_20150316_1935'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pod',
            name='downvotes',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pod',
            name='upvotes',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
