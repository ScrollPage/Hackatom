from rest_framework.generics import ListAPIView
from rest_framework import permissions
from django.db.models.functions import Trim

from .serializers import NotificatonSerializer
from notifications.models import Notification

class NotificationListView(ListAPIView):
    '''Уведомления пользователя'''
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificatonSerializer

    def get_queryset(self):
        return Notification.objects.filter(initiative=self.request.user) \
            .annotate(command_name=Trim('command__name', ))