# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=100000)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('from_user', models.ForeignKey(related_name='messagefrom', to='podsy.PodsyUser')),
                ('to_user', models.ForeignKey(related_name='messageto', to='podsy.PodsyUser')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
