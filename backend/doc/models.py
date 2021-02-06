from django.db import models

from command.models import Command
from initiative.models import Initiative
from chat.models import Chat

class Doc(models.Model):
    '''Документ'''
    name = models.CharField(max_length=30)
    role = models.CharField(max_length=100)
    doc = models.FileField(upload_to='docs/%Y/%m/%d')
    command = models.ForeignKey(
        Command, 
        verbose_name='Команда', 
        on_delete=models.CASCADE,
        related_name='docs'
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def _str__(self):
        return self.name

    class Meta:
        verbose_name = 'Документ'
        verbose_name_plural = 'Документы'

class ChatDoc(models.Model):
    '''Документ в чат'''
    chat = models.ForeignKey(
        Chat, verbose_name='Чат', 
        on_delete=models.CASCADE, 
        related_name='docs'
    )
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Отправитель',
        null=True, 
        on_delete=models.SET_NULL
    )
    doc = models.FileField('Документом', upload_to='chat_docs/%Y/%m/%d')

    class Meta:
        verbose_name = 'Документ в чате'
        verbose_name_plural = 'Документы в чате'
