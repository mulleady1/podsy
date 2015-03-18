# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0004_auto_20150316_1932'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pod',
            name='category',
        ),
        migrations.AddField(
            model_name='pod',
            name='subcategory',
            field=models.ForeignKey(default=1, to='podsy.Subcategory'),
            preserve_default=False,
        ),
    ]
