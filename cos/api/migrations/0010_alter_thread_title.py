# Generated by Django 4.1.5 on 2023-03-15 07:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_thread_rating_post_dislikes_thread_dislikes_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='title',
            field=models.CharField(max_length=150, verbose_name='Название темы'),
        ),
    ]