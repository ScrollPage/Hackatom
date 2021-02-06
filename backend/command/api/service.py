from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, UpdateModelMixin

from backend.service import PermissionSerializerMixin, PermissionMixin, QueryMixin

class PSCommandModelViewSet(PermissionSerializerMixin, ModelViewSet, QueryMixin):
    '''
    Модельный вью-сет команд
    Переопределение сериализатора и прав доступа
    '''
    pass

class PCreateDestroyViewSet(
    PermissionMixin, CreateModelMixin, 
    DestroyModelMixin, GenericViewSet,
):
    '''
    Создание, удаление
    Переопределение  прав доступа
    '''
    pass

class PUpdateDestroyViewSet(
    PermissionMixin, UpdateModelMixin, 
    DestroyModelMixin, GenericViewSet
):
    '''
    Обновление записи и удаление
    '''
    pass