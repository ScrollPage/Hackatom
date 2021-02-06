from rest_framework.permissions import BasePermission 
from django.shortcuts import get_object_or_404

from command.models import Command

class IsInCommand(BasePermission):
    '''Может ли постить в группу'''

    def has_permission(self, request, view):
        try:
            command = request.data['command']
        except KeyError:
            return True
        else:
            if not command:
                return True
            command = get_object_or_404(Command, id=command)
            return command.members.filter(initiative=request.user).exists() 