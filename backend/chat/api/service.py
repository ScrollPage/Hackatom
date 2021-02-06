from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, DestroyModelMixin, ListModelMixin

from backend.service import PermissionSerializerMixin

class PSModelViewSet(PermissionSerializerMixin, ModelViewSet, GenericViewSet):
    '''
    Создание модели
    Изменение модели
    Удаление модели
    Переопределение определения сериализатора и прав доступа
    '''
    pass
