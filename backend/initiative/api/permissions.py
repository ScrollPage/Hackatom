from rest_framework.permissions import BasePermission

class IsRightUser(BasePermission):
    '''Имеет ли пользователь право на обновление/удаление страницы'''

    def has_object_permission(self, request, view, obj):
        return request.user == obj

class NotYourself(BasePermission):
    '''Нельзя оставлять отзывы под собой'''
    def has_permission(self, request, view):
        try:
            estimated = request.data['estimated']
        except KeyError:
            return True
        return request.user.id != int(estimated)

class IsSteakHolderOrSelf(BasePermission):
    '''Является ли стейкхолдером'''
    def has_object_permission(self, request, view, obj):
        return any([
            request.user.is_steakholder,
            request.user == obj
        ])