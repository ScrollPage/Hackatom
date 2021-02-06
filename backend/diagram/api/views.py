from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .service import (
    PSCreateUpdateDestroyViewSet, 
    PCreateUpdateDestroyViewSet
)
from .serializers import (
    TaskSerializier, SelfTaskSerializier, 
    InitiativeTaskSerializer
)
from .permissions import (
    OwnerInitiatorOrAdmin, IsMember, 
    InitiatorOrAdmin, IsInitiativeInCommand,
    IsOwner
)
from diagram.models import Task, InitiativeTask

class TaskViewSet(PSCreateUpdateDestroyViewSet):
    '''
    Создание задачи
    Удаление задачи
    Обновление задачи
    '''
    serializer_class = TaskSerializier
    serializer_class_by_action = {
        'self_create': SelfTaskSerializier
    }
    permission_classes = [permissions.IsAuthenticated, OwnerInitiatorOrAdmin]
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated, IsMember],
        'self_create': [
            permissions.IsAuthenticated,
            InitiatorOrAdmin,
            IsInitiativeInCommand
        ]
    }
    queryset = Task.objects.all()

    def perform_create(self, serializer):
        serializer.save(initiative=self.request.user)

    @action(detail=False, methods=['post'])
    def self_create(self, request, *args, **kwargs):
        '''Создание задачи с выбранным пользователем'''
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class InitiativeTaskViewSet(PCreateUpdateDestroyViewSet):
    '''
    Создание задачи
    Удаление задачи
    Обновление задачи
    '''
    serializer_class = InitiativeTaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated]
    }
    queryset = InitiativeTask.objects.all()

    def perform_create(self, serialzier):
        serialzier.save(initiative=self.request.user)