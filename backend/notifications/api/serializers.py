from rest_framework import serializers

from notifications.models import Notification

class NotificatonSerializer(serializers.ModelSerializer):
    '''Сериализация уведомлений'''
    command_name = serializers.CharField()
    
    class Meta:
        model = Notification
        exclude = ['initiative']