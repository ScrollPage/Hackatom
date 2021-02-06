from rest_framework.test import APIClient
from rest_framework.permissions import BasePermission
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    UpdateModelMixin, RetrieveModelMixin, 
    CreateModelMixin, DestroyModelMixin
)
from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.urls import reverse
from django.conf import settings

def get_response(url, method, user=None, data=None, kwargs=None, format=None, query_params=None):
    client = APIClient()

    if user:
        client.force_authenticate(user)

    url = reverse(url, kwargs=kwargs)

    if query_params:
        url += '?'
        url += ''.join(f'{k}={v}&' for k, v in query_params.items())

    method_dict = {
        'post': client.post,
        'get': client.get,
        'patch': client.patch,
        'delete': client.delete,
        'put': client.put
    }
    return method_dict[method](url, data, format=format)

class PermissionMixin:
    '''Mixin permission для action'''
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]] 
        except KeyError:
            return [permission() for permission in self.permission_classes]

class SerializerMixin:
    '''Класс сериализатора в зависимости от action'''
    def get_serializer_class(self):
        try:
            return self.serializer_class_by_action[self.action]
        except KeyError:
            return self.serializer_class

class PermissionSerializerMixin(PermissionMixin, SerializerMixin):
    '''Доп классы'''
    pass


class RetrieveUpdateViewSet(
    GenericViewSet, UpdateModelMixin, 
    RetrieveModelMixin
):
    '''
    Обзор одной записи, обновление.
    '''
    pass

class EmptySerializer(serializers.Serializer):
    '''Пустой сериализатор'''
    pass

class IdSerializer(serializers.Serializer):
    '''Сериализует айди'''
    id = serializers.IntegerField()

class NameIdSerializer(IdSerializer):
    '''Сериализация имени инициативы'''
    name = serializers.CharField()

    class Meta:
        ref_name = 'name id'

class NameSerializer(serializers.StringRelatedField):
    '''Сериализация имен'''
    def to_internal_value(self, value):
        return value

class CompanyNameSerializer(NameIdSerializer):
    '''Сериализация имени и компании инициативы'''
    company = serializers.CharField()

class MembershipSerializer(serializers.Serializer):
    '''Сериализация членства в группе'''
    id = serializers.IntegerField(read_only=True)
    role = serializers.CharField()
    initiative = CompanyNameSerializer(read_only=True)
    command = NameIdSerializer(read_only=True)

    def update(self, instance, validated_data):
        instance.role = validated_data.get('role', instance.role)
        return instance

    def validate(self, attrs):
        data = self.context['request'].data
        if data['role'] in settings.ROLES:
            return super().validate(attrs)
        raise ParseError('No such role.')

class QueryMixin:
    '''Добавляет метод получения всех параметров строки'''
        
    def get_all_query_params(self):
        query_params = self.request.query_params
        query_params = ''.join(f'{k}={v}&' for k, v in query_params.items()) 
        return query_params

class PCreateDestroyViewSet(
    PermissionMixin, CreateModelMixin, 
    DestroyModelMixin, GenericViewSet
):
    '''Создание, удаление'''
    pass

class IsOwner(BasePermission):
    '''Владелец ли сущности'''

    def has_object_permission(self, request, view, obj):
        return request.user == obj.initiative