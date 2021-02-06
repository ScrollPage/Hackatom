from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin, CreateModelMixin, 
    DestroyModelMixin, UpdateModelMixin, 
    RetrieveModelMixin
)

from backend.service import PermissionSerializerMixin, PermissionMixin

class PSListCreateDestroyViewSet(
    PermissionSerializerMixin, ListModelMixin, 
    CreateModelMixin, DestroyModelMixin, GenericViewSet
):
    '''Список, создание, удаление'''
    pass
