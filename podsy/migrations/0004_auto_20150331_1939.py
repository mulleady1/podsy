# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0003_subcategory_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.CharField(max_length=1000, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='subcategory',
            name='description',
            field=models.CharField(max_length=1000, blank=True),
            preserve_default=True,
        ),
    ]
