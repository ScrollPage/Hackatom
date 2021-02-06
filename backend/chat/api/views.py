from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action 
from django.db.models import OuterRef, Exists, Q, Count
from django.conf import settings

from .service import PSModelViewSet
from .serializers import ChatSerializer, ChatCreateSerializer
from chat.models import Chat, Message
from doc.api.serializers import ChatDocSerializer
from .permissions import (
    IsNotChat, IsChat, IsTwoMembers, 
    NoSuchChat, IsMember, YourIdIn, 
    NotYourSelfChat
)

class ChatViewSet(PSModelViewSet):
    '''
    Создание чата
    Изменение чата
    Удаление чата
    Список чатов
    Обзор одого чата
    '''

    serializer_class = ChatSerializer
    serializer_class_by_action = {
        'create': ChatCreateSerializer,
        'docs': ChatDocSerializer
    }
    permission_classes = [permissions.IsAuthenticated, IsNotChat, IsMember]
    permission_classes_by_action = {
        'create': [permissions.IsAuthenticated, IsTwoMembers, NoSuchChat, YourIdIn, NotYourSelfChat],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated, IsMember],
        'destroy': [permissions.IsAuthenticated, IsChat, IsMember]
    }

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            user = instance.last_message.initiative
        except AttributeError:
            pass
        else:
            if user != request.user:
                instance.messages.filter(is_read=False) \
                    .select_for_update() \
                    .update(is_read=True) 
        finally:
            serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def docs(self, request, *args, **kwargs):
        chat = self.get_object()
        docs = chat.docs.all()
        serializer = self.get_serializer(docs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        queryset = Chat.objects.filter(members__in=[self.request.user])
        if self.action in settings.READ_ACTIONS:
            queryset = queryset \
                .annotate(is_unread_exists=Exists(
                        Message.objects.filter(chat=OuterRef('id'), is_read=False)
                    )
                ) \
                .annotate(num_unread=Count('messages', filter=Q(messages__is_read=False))) \
                .order_by('-num_unread')
        return queryset
            
