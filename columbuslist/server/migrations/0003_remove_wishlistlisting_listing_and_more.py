# Generated by Django 4.0.4 on 2022-04-27 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_tag_remove_listing_username_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wishlistlisting',
            name='listing',
        ),
        migrations.RemoveField(
            model_name='wishlistlisting',
            name='user',
        ),
        migrations.AddField(
            model_name='wishlistlisting',
            name='listingTitle',
            field=models.CharField(default='blank', max_length=255),
        ),
        migrations.AddField(
            model_name='wishlistlisting',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
        migrations.AddField(
            model_name='wishlistlisting',
            name='username',
            field=models.CharField(default='blank', max_length=255),
        ),
    ]