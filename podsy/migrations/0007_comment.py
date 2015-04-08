# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0006_auto_20150331_2009'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=10000)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('parent', models.ForeignKey(to='podsy.Comment', blank=True)),
                ('pod', models.ForeignKey(to='podsy.Pod')),
                ('user', models.ForeignKey(to='podsy.PodsyUser')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
