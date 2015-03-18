# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0003_auto_20150208_2013'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subcategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000, blank=True)),
                ('category', models.ForeignKey(to='podsy.Category')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='podsyuser',
            name='favoriteCategories',
            field=models.ManyToManyField(to='podsy.Subcategory', blank=True),
            preserve_default=True,
        ),
    ]
