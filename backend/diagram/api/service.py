from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    DestroyModelMixin, ListModelMixin
)

from backend.service import PermissionSerializerMixin, PermissionMixin

class PSCreateUpdateDestroyViewSet(
    PermissionSerializerMixin, 
    CreateModelMixin, GenericViewSet,
    UpdateModelMixin, DestroyModelMixin, 
):
    '''Создание, удаление, обновление'''
    pass

class PCreateUpdateDestroyViewSet(
    PermissionMixin, CreateModelMixin, 
    GenericViewSet, UpdateModelMixin, 
    DestroyModelMixin
):
    '''Список, создание, удаление, обновление'''
    pass