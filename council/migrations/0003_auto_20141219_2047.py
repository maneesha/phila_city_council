# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('council', '0002_auto_20141219_1955'),
    ]

    operations = [
        migrations.AlterField(
            model_name='councilmember',
            name='birthdate',
            field=models.CharField(blank=True, null=True, max_length=25),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='actual_end_date',
            field=models.CharField(blank=True, null=True, max_length=25),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='actual_start_date',
            field=models.CharField(blank=True, null=True, max_length=25),
            preserve_default=True,
        ),
    ]
