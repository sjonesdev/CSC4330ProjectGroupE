# Generated by Django 4.0.4 on 2022-04-28 03:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_remove_wishlistlisting_listing_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='contact',
            field=models.CharField(default='...', max_length=255),
        ),
    ]