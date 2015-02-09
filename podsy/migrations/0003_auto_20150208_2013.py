# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0002_auto_20150207_1700'),
    ]

    operations = [
        migrations.AddField(
            model_name='pod',
            name='downvotes',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pod',
            name='upvotes',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pod',
            name='image_url',
            field=models.URLField(blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='pod',
            name='url',
            field=models.URLField(),
            preserve_default=True,
        ),
    ]
