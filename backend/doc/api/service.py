from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin

from backend.service import PermissionMixin

class PCreateDestroyViewSet(
    PermissionMixin, CreateModelMixin, 
    DestroyModelMixin, GenericViewSet 
):
    '''
    Создание сущности, удаление сущности
    Переопределение определения прав доступа
    '''