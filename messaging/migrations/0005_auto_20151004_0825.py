# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0004_podsymessage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podsymessage',
            name='subject',
            field=models.CharField(max_length=10),
            preserve_default=True,
        ),
    ]
