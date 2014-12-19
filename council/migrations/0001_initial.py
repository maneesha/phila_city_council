# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Councilmember',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=25)),
                ('middle_name', models.CharField(max_length=25)),
                ('last_name', models.CharField(max_length=25)),
                ('suffix', models.CharField(max_length=10)),
                ('gender', models.CharField(max_length=1)),
                ('race', models.CharField(max_length=25)),
                ('birthdate', models.DateTimeField()),
                ('notes', models.CharField(max_length=250)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Term',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, serialize=False, verbose_name='ID')),
                ('departed', models.CharField(max_length=20)),
                ('departed_notes', models.CharField(max_length=250)),
                ('district', models.IntegerField()),
                ('party', models.CharField(max_length=15)),
                ('actual_start_date', models.DateTimeField()),
                ('actual_start_date_confirmed', models.BooleanField()),
                ('actual_end_date', models.DateTimeField()),
                ('actual_end_date_confirmed', models.BooleanField()),
                ('effective_start_year', models.IntegerField()),
                ('effective_end_year', models.IntegerField()),
                ('notes', models.CharField(max_length=250)),
                ('councilperson_id', models.ForeignKey(related_name='councilperson', to='council.Councilmember')),
                ('predecessor_id', models.ForeignKey(related_name='predecessor', to='council.Councilmember')),
                ('successor_id', models.ForeignKey(related_name='successor', to='council.Councilmember')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
