# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('council', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='councilmember',
            name='birthdate',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='councilmember',
            name='middle_name',
            field=models.CharField(null=True, blank=True, max_length=25),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='councilmember',
            name='notes',
            field=models.CharField(null=True, blank=True, max_length=250),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='councilmember',
            name='race',
            field=models.CharField(null=True, blank=True, max_length=25),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='councilmember',
            name='suffix',
            field=models.CharField(null=True, blank=True, max_length=10),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='actual_end_date',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='actual_start_date',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='departed_notes',
            field=models.CharField(null=True, blank=True, max_length=250),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='effective_end_year',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='effective_start_year',
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='notes',
            field=models.CharField(null=True, blank=True, max_length=250),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='term',
            name='party',
            field=models.CharField(null=True, blank=True, max_length=15),
            preserve_default=True,
        ),
    ]
