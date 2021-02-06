from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from post.models import Post
from initiative.models import Initiative

class Like(models.Model):
    '''Лайк к объявлению'''
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Пользователь', 
        on_delete=models.CASCADE
    )
    post = models.ForeignKey(
        Post, 
        verbose_name='Объявление', 
        on_delete=models.CASCADE,
        related_name='likes'
    )

    class Meta:
        verbose_name = 'Лайк'
        verbose_name_plural = 'Лайки'
        unique_together = ('initiative', 'post')

class Star(models.Model):
    '''Звезда рейтинга'''
    value = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = 'Звезда рейтинга'
        verbose_name_plural = 'Звезды рейтинга'

class Rating(models.Model):
    '''Рейтинга'''
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Инициатива', 
        on_delete=models.CASCADE,
        related_name='rating'
    ) 
    star = models.ForeignKey(
        Star, 
        verbose_name = 'Звезда', 
        on_delete = models.CASCADE,
    )
    appraiser = models.ForeignKey(
        Initiative, 
        verbose_name='Оценщик', 
        on_delete=models.CASCADE,
        related_name='+'
    )

    class Meta:
        verbose_name = 'Рейтинг'
        verbose_name_plural = 'Рейтинги'
