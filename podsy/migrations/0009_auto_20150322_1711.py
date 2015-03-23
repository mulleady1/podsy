# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('podsy', '0008_auto_20150322_1708'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pod',
            old_name='audio_url',
            new_name='audio_file_url',
        ),
        migrations.RenameField(
            model_name='pod',
            old_name='host_url',
            new_name='podcast_url',
        ),
    ]
