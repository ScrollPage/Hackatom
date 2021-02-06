from django.db import models

from command.models import Command
from initiative.models import Initiative

class Diagram(models.Model):
    '''Диаграмма Ганта'''
    command = models.OneToOneField(
        Command, verbose_name='Команда владелец', 
        on_delete=models.CASCADE, related_name='diagram'
    )

    class Meta:
        verbose_name = 'Диаграмма Ганта'
        verbose_name_plural = 'Диаграммы Ганта'

class Task(models.Model):
    '''Задания пользователям'''
    initiative = models.ForeignKey(
        Initiative, verbose_name='Исполняющий', 
        on_delete=models.CASCADE, related_name='tasks'
    )
    begin_time = models.DateField()
    end_time = models.DateField()
    diagram = models.ForeignKey(
        Diagram, verbose_name='Диграмма заданий', 
        on_delete=models.CASCADE, related_name='tasks'
    )
    name = models.CharField('Название задачи', max_length=50)
    description = models.CharField('Описание задачи', max_length=200, default='')
    percentage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = 'Задача'
        verbose_name_plural = 'Задачи'

class InitiativeTask(models.Model):
    '''Задания пользователям'''
    initiative = models.ForeignKey(
        Initiative, verbose_name='Исполняющий', 
        on_delete=models.CASCADE, related_name='my_tasks'
    )
    begin_time = models.DateField()
    end_time = models.DateField()
    name = models.CharField('Название задачи', max_length=50)
    description = models.CharField('Описание задачи', max_length=200, default='')
    percentage = models.SmallIntegerField(default=0)

    class Meta:
        verbose_name = 'Пользовательская задача'
        verbose_name_plural = 'Пользовательские задачи'