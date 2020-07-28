# Generated by Django 3.0.8 on 2020-07-28 08:21

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0002_post_date_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.AddField(
            model_name='post',
            name='bookmark_users',
            field=models.ManyToManyField(blank=True, null=True, related_name='bookmarked_posts', to=settings.AUTH_USER_MODEL, verbose_name='users who bookmarked the post'),
        ),
        migrations.AddField(
            model_name='post',
            name='dropped_rating_users',
            field=models.ManyToManyField(blank=True, null=True, related_name='dropped_posts', to=settings.AUTH_USER_MODEL, verbose_name='users who dropped the rating'),
        ),
        migrations.AddField(
            model_name='post',
            name='raised_rating_users',
            field=models.ManyToManyField(blank=True, null=True, related_name='raised_posts', to=settings.AUTH_USER_MODEL, verbose_name='users who raised the rating'),
        ),
        migrations.AddField(
            model_name='post',
            name='rating',
            field=models.IntegerField(default=0),
        ),
    ]
