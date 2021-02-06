from rest_framework import permissions
from rest_framework.generics import CreateAPIView

from .service import PCreateDestroyViewSet
from .serializers import DocSerializer, ChatDocSerializer
from .permissions import CanUpload, CanDestroy, InitiativeInChat
from doc.models import Doc

class PDocViewSet(PCreateDestroyViewSet):
    '''
    Создание документа
    Удаление документа
    '''
    serializer_class = DocSerializer
    permission_classes = [permissions.IsAuthenticated, CanUpload]
    permission_classes_by_action = {
        'destroy': [permissions.IsAuthenticated, CanDestroy]
    }
    queryset = Doc.objects.all()

class ChatDocView(CreateAPIView):
    '''Создание документа в чате'''
    serializer_class = ChatDocSerializer
    permission_classes = [permissions.IsAuthenticated, InitiativeInChat]

    def perform_create(self, serializer):
        serializer.save(initiative=self.request.user)