# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000, blank=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=10000)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('parent', models.ForeignKey(blank=True, to='podsy.Comment', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Pod',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=1000)),
                ('podcast_url', models.URLField(blank=True)),
                ('audio_url', models.URLField(blank=True)),
                ('audio_file', models.BinaryField(blank=True)),
                ('upvotes', models.IntegerField(default=0)),
                ('downvotes', models.IntegerField(default=0)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('category', models.ForeignKey(to='podsy.Category')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PodsyUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('favoritePods', models.ManyToManyField(to='podsy.Pod', blank=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=1000, blank=True)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='pod',
            name='tags',
            field=models.ManyToManyField(to='podsy.Tag', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='pod',
            name='user',
            field=models.ForeignKey(to='podsy.PodsyUser'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='comment',
            name='pod',
            field=models.ForeignKey(to='podsy.Pod'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='comment',
            name='user',
            field=models.ForeignKey(to='podsy.PodsyUser'),
            preserve_default=True,
        ),
    ]
