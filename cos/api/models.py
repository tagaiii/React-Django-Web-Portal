from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


class User(AbstractUser):
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = None

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Article(models.Model):
    header = models.CharField(max_length=100, null=True, blank=True, verbose_name='Заголовок')
    body = models.TextField(null=True, blank=True, verbose_name='Содержание')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')
    image = models.ImageField(upload_to='media',verbose_name='Изображение')
    recommended = models.BooleanField(default=False, verbose_name='Рекомендуемое')
    for_main_page = models.BooleanField(default=False, verbose_name='Для главной страницы(карусель)')
    viewers = models.PositiveIntegerField(default=0, verbose_name='Просмотры')
    tags = models.ManyToManyField('Tag', blank=True, verbose_name='Тэги поста', related_name='related_article')
    likes = models.ManyToManyField('User', blank=True, verbose_name='Отметки "Нравится"')

    def __str__(self):
        return str(self.header)

class Tag(models.Model):
    title = models.CharField(max_length=30,unique=True, verbose_name='Название тэга')

    def __str__(self):
        return self.title


class Comment(models.Model):
    body = models.TextField(verbose_name='Текст комментария')
    author = models.ForeignKey(User, verbose_name='Автор комментария', on_delete=models.CASCADE)
    article = models.ForeignKey(Article, verbose_name='Комментарий к новости', related_name='comments', on_delete=models.CASCADE)
    parent = models.ForeignKey('self', blank=True, null=True, verbose_name='Ответ на комментарий', related_name='answers', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')
    likes = models.ManyToManyField('User', blank=True, verbose_name='Отметки "Нравится"', related_name="comment_likes")

    def __str__(self):
        return self.body
    

class Thread(models.Model):
    content = models.TextField(verbose_name='Содержание')
    content_to_display = models.TextField(verbose_name='HTML-код содержимого')
    title = models.CharField(max_length=150, verbose_name='Название темы')
    author = models.ForeignKey(User, verbose_name='Автор темы', on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, blank=True, verbose_name='Отметки "Нравится"', related_name='thread_likes')
    dislikes = models.ManyToManyField(User, blank=True, verbose_name='Отметки "Не нравится"', related_name='thread_dislikes')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    def __str__(self):
        return f"{self.id} | {self.author} | {self.title}"


class Post(models.Model):
    content = models.TextField(verbose_name='Содержание')
    content_to_display = models.TextField(verbose_name='HTML-код содержимого')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, verbose_name='Ответ к теме', related_name='related_posts', on_delete=models.CASCADE)
    likes = models.ManyToManyField(User, blank=True, verbose_name='Отметки "Нравится"', related_name='post_likes')
    dislikes = models.ManyToManyField(User, blank=True, verbose_name='Отметки "Не нравится"', related_name='post_dislikes')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    def __str__(self):
        return f"id: {self.id} | {self.author} | {self.thread.title}"