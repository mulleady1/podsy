# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('podsy', '0003_auto_20150205_1734'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PodsyUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('favoriteCategories', models.ManyToManyField(to='podsy.Category')),
                ('favoritePods', models.ManyToManyField(to='podsy.Pod')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='pod',
            name='category',
            field=models.ForeignKey(default=None, to='podsy.Category'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pod',
            name='user',
            field=models.ForeignKey(to='podsy.PodsyUser'),
            preserve_default=True,
        ),
    ]
