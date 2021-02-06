from django.db import models
from django.db.models.signals import post_save,  pre_delete
from django.dispatch import receiver

from backend.settings import pusher_client
from initiative.models import Initiative, Category, Requirenment

class Command(models.Model):
    '''Команда'''
    name = models.CharField(max_length=100, unique=True)
    initiator = models.ForeignKey(
        Initiative,
        verbose_name='Инициатор',
        on_delete=models.CASCADE,
        related_name='my_commands'
    )
    whitelist = models.ManyToManyField(
        Initiative, 
        verbose_name='Белый список на скачивание', 
        related_name='+'
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Команда'
        verbose_name_plural = 'Команды'
        ordering = ['name']

class CommandInfo(models.Model):
    '''Информация о команде'''
    requirenments = models.ManyToManyField(
        Requirenment, 
        verbose_name='Потребности'
    )
    categories = models.ManyToManyField(
        Category, 
        verbose_name='Категории', 
    )
    title = models.CharField(max_length=100, blank=True, default='')
    idea = models.CharField(max_length=100, null=True, blank=True, default='')
    end_time = models.DateField(null=True)
    description = models.TextField(max_length=5000, null=True, blank=True, default='')
    command = models.OneToOneField(
        Command, 
        verbose_name='Команда', 
        on_delete=models.CASCADE,
        related_name='info'
    )
    categories = models.ManyToManyField(Category, verbose_name='Категории')
    image = models.ImageField(upload_to='images/%Y/%m/%d')

    def __str__(self):
        return f'информация о f{self.command}'
    
    class Meta:
        verbose_name = 'Информация о команде'
        verbose_name_plural = 'Информация о командах'

class JoinRequest(models.Model):
    '''Запрос на добавление'''
    role = models.CharField(max_length=30)
    command = models.ForeignKey(
        Command, 
        verbose_name='Получатель', 
        on_delete=models.CASCADE,
        related_name='join_requests'
    )
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Отправитель', 
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f'{self.initiative} -(join)-> {self.command}'

    class Meta:
        verbose_name = 'Запрос на добавление'
        verbose_name_plural = 'Запросы на добавление'

class Membership(models.Model):
    '''Членство в группе'''
    role = models.CharField(max_length=30)
    command = models.ForeignKey(
        Command, 
        verbose_name='Получатель', 
        on_delete=models.CASCADE,
        related_name='members'
    )
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Отправитель', 
        on_delete=models.CASCADE,
        related_name='commands'
    )

    def __str__(self):
        return f'{self.initiative} is {self.role} in {self.command}'

    class Meta:
        verbose_name = 'Членство в группе'
        verbose_name_plural = 'Членства в группах'

class AccessRequest(models.Model):
    '''Запрос на добавление'''
    command = models.ForeignKey(
        Command, 
        verbose_name='Получатель', 
        on_delete=models.CASCADE,
        related_name='access_requests'
    )
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Отправитель', 
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.initiative} -(access)-> {self.command}'

    class Meta:
        verbose_name = 'Запрос на скачивание'
        verbose_name_plural = 'Запросы на скачивание'

@receiver(post_save, sender=Command)
def create_command_infochat_diagram(sender, instance=None, created=False, **kwargs):
    '''Создает информацию о команде, командный чат и диаграмму'''
    if created:
        from chat.models import Chat
        from diagram.models import Diagram

        chat = Chat.objects.create(
            name=f'Чат команды {instance.name}',
            command=instance, 
            is_chat=False, 
        )

        Membership.objects.create(
            role='Инициатор',
            command=instance,
            initiative=instance.initiator,
        )
        CommandInfo.objects.create(command=instance, id=instance.id)
        Diagram.objects.create(command=instance, id=instance.id)

@receiver(pre_delete, sender=Membership)
def remove_member_from_chat(sender, instance=None, **kwargs):
    '''Убирает участника из чата команды'''
    from chat.models import Chat

    chat = instance.command.command_chat
    chat.members.remove(instance.initiative)

@receiver(post_save, sender=Membership)
def join_manipulations(sender, instance=None, **kwargs):
    '''
    Убирает участника из чата команды
    Удаляет из списка на скачивание
    '''
    from chat.models import Chat

    chat = instance.command.command_chat
    chat.members.add(instance.initiative)
    instance.command.whitelist.remove(instance.initiative)

@receiver(pre_delete, sender=JoinRequest)
def send_join_note(sender, instance=None, **kwargs):
    '''Создает и отправляет уведомление о принятии в команду'''
    from notifications.models import Notification

    Notification.objects.create(
        note=1, 
        command=instance.command, 
        initiative=instance.initiative
    )
    pusher_client.trigger(
        f'notifications{instance.initiative.id}',
        'join-request',
        {'command': f'{instance.command}', 'role': f'{instance.role}'}
    )
    

@receiver(pre_delete, sender=AccessRequest)
def send_access_note(sender, instance=None, **kwargs):
    '''Создает и отправляет уведомление о получении доуступа на скачивание'''
    from notifications.models import Notification
        
    Notification.objects.create(
        note=2, 
        command=instance.command, 
        initiative=instance.initiative
    )
    pusher_client.trigger(
        f'notifications{instance.initiative.id}',
        'access-request',
        {'command': f'{instance.command}'}
    )