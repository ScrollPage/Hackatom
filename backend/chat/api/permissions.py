from rest_framework.permissions import BasePermission

from chat.models import Chat

class IsNotChat(BasePermission):
    '''Является ли беседой''' 
    def has_object_permission(self, request, view, obj):
        return not obj.is_chat

class IsChat(BasePermission):
    '''Является ли чатом''' 
    def has_object_permission(self, request, view, obj):
        return obj.is_chat

class IsTwoMembers(BasePermission):
    '''Только 2 участника'''
    def has_permission(self, request, view):
        try:
            members = request.data['members']
        except KeyError:
            return True
        return len(members) == 2

class NoSuchChat(BasePermission):
    '''Нет ли такого чата'''
    def has_permission(self, request, view):
        try:
            members = request.data['members']
        except KeyError:
            return True
        return not Chat.objects.filter(members__id=members[0], is_chat=True) \
            .filter(members__id=members[1]).exists()

class IsMember(BasePermission):
    '''Участник ли чата'''
    def has_object_permission(self, request, view, obj):
        return request.user in obj.members.all()

class YourIdIn(BasePermission):
    '''Айди чата в участниках'''
    def has_permission(self, request, view):
        try:
            members = request.data['members']
        except KeyError:
            return True
        return request.user.id in members

class NotYourSelfChat(BasePermission):
    '''Чат не с самим собой'''
    def has_permission(self, request, view):
        try:
            members = request.data['members']
        except KeyError:
            return True
        return not all([request.user.id==uid for uid in members])