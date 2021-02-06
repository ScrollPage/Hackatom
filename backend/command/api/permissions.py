from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from command.models import Membership, Command

class IsCommandInitiator(BasePermission):
    '''Является ли инициатором команды'''

    def has_object_permission(self, request, view, obj):
        return request.user == obj.initiator

class IsCommandInitiatorOrAdmin(BasePermission):
    '''Является ли инициатором или администратором команды'''

    def has_object_permission(self, request, view, obj):
        return any([
            request.user == obj.initiator,
            request.user.commands.filter(command=obj, role='Администратор') \
                in Membership.objects.filter(command=obj, role='Администратор')
        ])

class CanChangeInfo(BasePermission):
    '''Является ли инициатором команды и может ли менять информацию'''
    def has_object_permission(self, request, view, obj):
        return request.user == obj.command.initiator

class OwnerInitiatorOrAdmin(BasePermission):
    '''
    Может ли удалить запрос на добавление
    Также подходит для запроса на доступ
    И для объекта членства в группе
    '''
    def has_object_permission(self, request, view, obj):
        return any([
            request.user == obj.initiative,
            request.user == obj.command.initiator,
            obj.command.members.filter(role='Администратор', initiative=request.user).exists()
        ])

class InitiatorOrAdmin(BasePermission):
    '''Инициатор или админ'''
    def has_object_permission(self, request, view, obj):
        return any([
            request.user == obj.command.initiator,
            obj.command.members.filter(role='Администратор', initiative=request.user).exists()
        ])

class IsMemberOrAccepted(BasePermission):
    '''Может ли видеть ссылку на документ'''
    def has_object_permission(self, request, view, obj):
        return any([
            obj.members.filter(initiative=request.user).exists(),
            request.user in obj.whitelist.all() 
        ])

class IsMember(BasePermission):
    '''Участник ли'''
    def has_object_permission(self, request, view, obj):
        return obj.members.filter(initiative=request.user).exists(),

class IsNotCommandMember(BasePermission):
    '''Не участник команды'''

    def has_permission(self, request, view):
        try:
            command = request.data['command']
        except KeyError:
            return True
        command = get_object_or_404(Command, id=command)
        return not Membership.objects.filter(
            command=command, initiative=request.user
        ).exists()

class IsNotInWhitelist(BasePermission):
    '''Не в бклом списке на скачивание команды'''

    def has_permission(self, request, view):
        try:
            command = request.data['command']
        except KeyError:
            return True
        command = get_object_or_404(Command, id=command)
        return request.user not in command.whitelist.all()
