from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.conf import settings

from initiative.api.serializers import ShortInitiativeSerializer
from doc.models import Doc, ChatDoc

class DocSerializer(serializers.ModelSerializer):
    '''Сериализация документа'''

    class Meta:
        model = Doc
        exclude = ['timestamp']

    def validate(self, attrs):
        data = self.context['request'].data
        if data.get('role', None):
            if all([role in settings.ROLES for role in data['role'].split(',')]):
                return super().validate(attrs)
            raise ParseError('No such role.')
        raise ParseError('sosi')

class ChatDocSerializer(serializers.ModelSerializer):
    '''Документ в чате'''
    initiative = ShortInitiativeSerializer(read_only=True)

    class Meta:
        model = ChatDoc
        fields = '__all__'