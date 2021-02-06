from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from command.models import Membership, Command

class OwnerInitiatorOrAdmin(BasePermission):
    '''
    Владелец, инициатор или админ
    '''
    def has_object_permission(self, request, view, obj):
        return any([
            request.user == obj.initiative,
            request.user == obj.diagram.command.initiator,
            obj.diagram.command.members.filter(
                role='Администратор', 
                initiative=request.user
            ).exists()
        ])

class IsMember(BasePermission):
    '''Участник ли'''
    def has_permission(self, request, view):
        try:
            diagram = request.data['diagram']
        except KeyError:
            return True
        command = get_object_or_404(Command, id=diagram)
        return Membership.objects.filter(
            command=command, 
            initiative=request.user
        ).exists()

class InitiatorOrAdmin(BasePermission):
    '''
    Инициатор или админ
    '''
    def has_permission(self, request, view):
        try:
            diagram = request.data['diagram']
        except KeyError:
            return True
        command = get_object_or_404(Command, id=diagram)
        return any([
            Membership.objects.filter(
                command=command, 
                initiative=request.user, 
                role='Инициатор'
            ).exists(),
            Membership.objects.filter(
                command=command, 
                initiative=request.user, 
                role='Администратор'
            ).exists()
        ])

class IsInitiativeInCommand(BasePermission):
    '''Есть ли такая иниуиатива в команде'''
    def has_permission(self, request, view):
        try:
            initiative = request.data['initiative']
            diagram = request.data['diagram']
        except KeyError:
            return True
        command = get_object_or_404(Command, id=diagram)
        return Membership.objects.filter(
            command=command,
            initiative__id=int(initiative)
        ).exists()

class IsOwner(BasePermission):
    '''Чей таск'''
    def has_object_permission(self, request, view, obj):
        return request.user == obj.initiative