from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.conf import settings

from command.models import Command, CommandInfo, JoinRequest, AccessRequest
from initiative.api.serializers import ShortInitiativeSerializer
from backend.service import NameIdSerializer, NameSerializer

class CommandUpdateInfoSerializer(serializers.ModelSerializer):
    '''Сериализатор для апдейта'''
    categories = NameSerializer(many=True)
    requirenments = NameSerializer(many=True)

    class Meta:
        model = CommandInfo
        exclude = ['command']

class CommandInfoSerializer(serializers.ModelSerializer):
    '''Сериализация информации о команде'''
    categories = NameIdSerializer(many=True)
    requirenments = NameIdSerializer(many=True)

    class Meta:
        model = CommandInfo
        exclude = ['command']

class CommandSerializer(serializers.ModelSerializer):
    '''Сериализация команд'''
    initiator = ShortInitiativeSerializer(read_only=True)
    is_initiator = serializers.BooleanField(read_only=True)
    info = CommandInfoSerializer(read_only=True)
    rate = serializers.DecimalField(max_digits=2, decimal_places=1, read_only=True)
    num_members = serializers.IntegerField(read_only=True)
    joined = serializers.BooleanField(read_only=True)
    is_sent_join = serializers.BooleanField(read_only=True)
    is_sent_access = serializers.BooleanField(read_only=True)
    can_download = serializers.BooleanField(read_only=True)
    has_chat = serializers.BooleanField(read_only=True)
    chat_id = serializers.IntegerField(read_only=True)
    membership_id = serializers.IntegerField(read_only=True)
    is_admin = serializers.BooleanField(read_only=True)

    class Meta:
        model = Command
        fields = [
            'name', 'initiator', 'is_initiator', 
            'info', 'rate', 'num_members', 'is_admin',
            'joined', 'is_sent_join', 'is_sent_access',
            'can_download', 'has_chat', 'chat_id', 'membership_id'
        ]

class JoinRequestSerializer(serializers.ModelSerializer):
    '''Сериализация запроса на добавление'''
    initiative = ShortInitiativeSerializer(read_only=True)

    class Meta:
        model = JoinRequest
        fields = ['id', 'command', 'initiative', 'role']
        extra_kwargs = {
            'command': {'write_only': True}
        }

    def validate(self, attrs):
        data = self.context['request'].data
        if data['role'] in settings.ROLES:
            return super().validate(attrs)
        raise ParseError('No such role.')

class AccessRequestSerializer(serializers.ModelSerializer):
    '''Сериализация запроса на добавление'''
    initiative = ShortInitiativeSerializer(read_only=True)

    class Meta:
        model = AccessRequest
        fields = ['id', 'command', 'initiative']
        extra_kwargs = {
            'command': {'write_only': True}
        }
    