# Generated by Django 3.0.8 on 2020-07-22 17:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2020, 7, 22, 20, 43, 6, 983684)),
            preserve_default=False,
        ),
    ]
