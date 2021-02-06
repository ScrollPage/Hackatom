from django.db import models
from django.db.models import Count, Q
from django.utils import timezone
from django.db.models.functions import Trunc

from datetime import timedelta

from command.models import Command
from initiative.models import Initiative

class PostManager(models.Manager):
    '''Дополнительные методы'''

    def annotate_likes(self, user):
        return self.annotate(num_likes=Count('likes', distinct=True)) \
            .annotate(is_liked=Count('likes', filter=Q(likes__initiative=user), distinct=True))

class Post(models.Model):
    '''Объявление'''
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Инициатива-создатель', 
        on_delete=models.CASCADE,
        related_name='posts'
    )
    command = models.ForeignKey(
        Command, 
        verbose_name='Команда-владелец', 
        on_delete=models.CASCADE,
        null=True,
        related_name='command_posts'
    )
    title = models.TextField(max_length=1000, null=True)
    picture = models.ImageField(upload_to='pictures/%Y/%m/%d', null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    objects = PostManager()

    def __str__(self):
        return f'{self.initiative} post'

    class Meta:
        verbose_name = 'Объявление'
        verbose_name_plural = 'Объявления'

    def delete(self):
        self.picture.delete(save=False)
        super().delete()

    @property
    def last_comment(self): 
        return self.comments.last()

class Comment(models.Model):
    post = models.ForeignKey(
        Post, verbose_name='Пост', 
        on_delete=models.CASCADE, related_name='comments'
    )
    initiative = models.ForeignKey(
        Initiative, verbose_name='Создатель', 
        on_delete=models.CASCADE
    )
    content = models.TextField('Контент', max_length=1000)
    timestamp = models.DateTimeField('Временная метка', auto_now_add=True)

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'