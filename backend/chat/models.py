from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from backend.settings import pusher_client
from initiative.models import Initiative
from command.models import Command

class Chat(models.Model):
    '''Чатик'''
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(
        Initiative, verbose_name='Участники', 
        related_name='chats'
    )
    is_chat = models.BooleanField(default=True)
    command = models.OneToOneField(
        Command, verbose_name='Чат команды', null=True,
        on_delete=models.CASCADE, related_name='command_chat',
    )

    @property
    def last_message(self):
        return self.messages.last()

    class Meta:
        verbose_name = 'Чат'
        verbose_name_plural = 'Чаты'

class Message(models.Model):
    '''Сообщение'''

    url = models.CharField(max_length=200, null=True)
    chat = models.ForeignKey(
        Chat, verbose_name='Чат', 
        on_delete=models.CASCADE, related_name='messages'
    )
    initiative = models.ForeignKey(
        Initiative, 
        verbose_name='Отправитель',
        null=True, 
        on_delete=models.SET_NULL
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    content = models.TextField(max_length=5000)

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'

@receiver(post_save, sender=Message)
def send_join_note(sender, instance=None, **kwargs):
    '''Создает и отправляет уведомление о сообщении'''
    from notifications.models import Notification

    members = instance.chat.members.exclude(id=instance.initiative.id)
    list(map(lambda member:
            pusher_client.trigger(
                f'notifications{member.id}',
                'new-message',
                {
                    'chat': {
                        'is_chat': instance.chat.is_chat,
                        'chat_name': instance.chat.name
                    },
                    'sender': {
                        'sender_id': instance.initiative.id,
                        'sender_company': instance.initiative.company
                    }
                }
            ),
            members
        )
    )