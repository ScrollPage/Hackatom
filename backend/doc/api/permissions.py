from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from command.models import Membership, Command
from chat.models import Chat

class CanUpload(BasePermission):
    '''Может ли загружать документы в ту команду'''
    def has_permission(self, request, view):
        try:
            command = request.data['command']
        except KeyError:
            return True
        command = get_object_or_404(Command, id=command)
        return request.user.commands.filter(command=command).exists()

class CanDestroy(BasePermission):
    '''Может ли загружать документы в ту команду'''
    def has_object_permission(self, request, view, obj):
        return request.user.commands.filter(
            command=obj.command, role__in=['Инициатор', 'Администратор']
        ).exists()
        
class InitiativeInChat(BasePermission):
    '''Может ли загружать документы в ту команду'''
    def has_permission(self, request, view):
        try:
            chat = request.data['chat']
        except:
            return True
        return get_object_or_404(Chat, id=chat) in request.user.chats.all()