from rest_framework import serializers

from diagram.models import Diagram, Task, InitiativeTask
from initiative.api.serializers import ShortInitiativeSerializer
from backend.service import NameIdSerializer

class InitiativeTaskSerializer(serializers.ModelSerializer):
    '''Сериализация пользовательской задачи'''
    initiative = ShortInitiativeSerializer(read_only=True)

    class Meta:
        model = InitiativeTask
        fields = '__all__'

class SelfTaskSerializier(serializers.ModelSerializer):
    '''Сериализация задач'''

    class Meta:
        model = Task
        fields = '__all__'

class TaskSerializier(serializers.ModelSerializer):
    '''Сериализация задач'''
    initiative = ShortInitiativeSerializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        extra_kwargs = {
            'diagram': {'write_only': True},
        }

class DiagramSerializer(serializers.ModelSerializer):
    '''Сериализатор диаграм'''
    tasks = TaskSerializier(read_only=True, many=True)
    is_initiator = serializers.BooleanField(read_only=True)
    is_admin = serializers.BooleanField(read_only=True)
    command = NameIdSerializer(read_only=True)

    class Meta:
        model = Diagram
        fields = '__all__'