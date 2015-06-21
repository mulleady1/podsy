# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messaging', '0002_auto_20150618_1910'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='conversation',
            field=models.ForeignKey(default=1, to='messaging.Conversation'),
            preserve_default=False,
        ),
    ]
