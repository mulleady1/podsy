# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0005_auto_20150331_2005'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='created',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 8, 45, 59939, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='category',
            name='modified',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 8, 55, 984855, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pod',
            name='created',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 14, 969787, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pod',
            name='modified',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 18, 77718, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='podsyuser',
            name='created',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 20, 125668, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='podsyuser',
            name='modified',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 21, 786509, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='subcategory',
            name='created',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 25, 305759, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='subcategory',
            name='modified',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 28, 203652, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tag',
            name='created',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 32, 924579, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tag',
            name='modified',
            field=models.DateField(default=datetime.datetime(2015, 4, 1, 3, 9, 39, 471543, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
    ]
