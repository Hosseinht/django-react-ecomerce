# Generated by Django 3.2.4 on 2021-10-27 08:10

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_auto_20211023_1612'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='created_At',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
