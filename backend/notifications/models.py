from django.db import models

from initiative.models import Initiative
from command.models import Command

class Notification(models.Model):
    '''Модель уведомления'''
    CHOICES = (
        (1, 'Уведомление о принятии в команду'),
        (2, 'Уведомление о разрешении доступа'),
    )
    note = models.CharField(max_length=40, choices=CHOICES)
    initiative = models.ForeignKey(
        Initiative, verbose_name='Получатель уведомления', 
        on_delete=models.CASCADE, related_name='notifications'
    )
    command = models.ForeignKey(
        Command, verbose_name='Команда, принявшая запрос', 
        on_delete=models.CASCADE,
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)