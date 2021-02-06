from rest_framework import status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Count, Avg, DateTimeField, Subquery, Exists, OuterRef, Sum
from django.db.models.functions import Trunc, Coalesce
from django.shortcuts import get_object_or_404 
from django.conf import settings
from django.http import QueryDict

from url_filter.integrations.drf import DjangoFilterBackend

from backend.service import (
    RetrieveUpdateViewSet, IdSerializer, 
    MembershipSerializer
)
from diagram.api.serializers import DiagramSerializer
from post.api.serializers import PostSerializer
from doc.api.serializers import DocSerializer
from post.models import Post
from .service import (
    PSCommandModelViewSet, PCreateDestroyViewSet, 
    PUpdateDestroyViewSet
)
from .permissions import (
    IsCommandInitiator, CanChangeInfo, 
    OwnerInitiatorOrAdmin, IsCommandInitiatorOrAdmin,
    InitiatorOrAdmin, IsMemberOrAccepted,
    IsNotCommandMember, IsNotInWhitelist,
    IsMember
)
from command.models import (
    Command, CommandInfo, JoinRequest, 
    Membership, AccessRequest
)
from .serializers import (
    CommandSerializer, CommandInfoSerializer, 
    JoinRequestSerializer, CommandUpdateInfoSerializer,
    AccessRequestSerializer
)

class CommandViewSet(PSCommandModelViewSet):
    '''
    Создание команды
    Список команд
    Обновление полей команды
    Удаление команды
    Обзор одной команды
    '''
    serializer_class = CommandSerializer
    serializer_class_by_action = {
        'join_list': JoinRequestSerializer,
        'join_accept': IdSerializer,
        'access_list': AccessRequestSerializer,
        'access_accept': IdSerializer,
        'members': MembershipSerializer,
        'posts': PostSerializer,
        'doc': DocSerializer,
        'diagram': DiagramSerializer
    }
    permission_classes = [permissions.IsAuthenticated, IsCommandInitiator]
    permission_classes_by_action = {
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'create': [permissions.IsAuthenticated],
        'join_list': [permissions.IsAuthenticated, IsCommandInitiatorOrAdmin],
        'join_accept': [permissions.IsAuthenticated, IsCommandInitiatorOrAdmin],
        'access_list': [permissions.IsAuthenticated, IsCommandInitiatorOrAdmin],
        'access_accept': [permissions.IsAuthenticated, IsCommandInitiatorOrAdmin],
        'members': [permissions.IsAuthenticated],
        'posts': [permissions.IsAuthenticated],
        'doc': [permissions.IsAuthenticated, IsMemberOrAccepted],
        'diagram': [permissions.IsAuthenticated, IsMember]
    }
    filter_backends = [DjangoFilterBackend]
    filter_fields = '__all__'

    def get_queryset(self):
        queryset = Command.objects.all()
        
        if self.action in settings.READ_ACTIONS:
            return queryset \
                .annotate(is_initiator=Count(
                        'initiator', 
                        filter=Q(initiator=self.request.user)
                    )
                ) \
                .annotate(rate=Avg('members__initiative__rating__star__value')) \
                .annotate(num_members=Count('members', distinct=True)) \
                .annotate(joined=Exists(
                        Membership.objects.filter(
                            command=OuterRef('pk'),
                            initiative=self.request.user
                        )
                    )
                ) \
                .annotate(is_sent_join=Exists(
                        JoinRequest.objects.filter(
                            command=OuterRef('pk'),
                            initiative=self.request.user
                        )
                    )
                ) \
                .annotate(is_sent_access=Exists(
                        AccessRequest.objects.filter(
                            command=OuterRef('pk'),
                            initiative=self.request.user
                        )
                    )
                ) \
                .annotate(has_chat=Count(
                        'initiator__chats', 
                        filter=Q(
                            initiator__chats__members__in=[self.request.user],
                            initiator__chats__is_chat=True
                        ),
                        distinct=True
                    )
                ) \
                .annotate(chat_id=Avg(
                        'initiator__chats__id', 
                        filter=Q(
                            initiator__chats__members__in=[self.request.user], 
                            initiator__chats__is_chat=True
                        ),
                        distinct=True
                    )
                ) \
                .annotate(membership_id=Avg(
                        'members__id', 
                        filter=Q(members__initiative__in=[self.request.user])
                    )
                ) \
                .annotate(can_download=Count(
                    'whitelist', 
                    filter=Q(whitelist__in=[self.request.user])
                    )
                ) \
                .annotate(is_admin=Exists(
                        Membership.objects.filter(
                            command=OuterRef('pk'),
                            initiative=self.request.user,
                            role='Администратор'
                        )
                    )
                ) \
                .order_by(self.request.query_params.get('sort', 'name'))
                
        return queryset

    @action(detail=True, methods=['get'])
    def join_list(self, request, *args, **kwargs):
        '''Список запросов на добавление'''
        command = self.get_object()
        requests = command.join_requests.all()
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def join_accept(self, request, *args, **kwargs):
        '''Принятие запроса на добавление'''
        command = self.get_object()
        serializer = self.get_serializer(request.data)
        join_request = get_object_or_404(
            command.join_requests.all(), 
            id=serializer.data['id']
        )
        Membership.objects.create(
            role=join_request.role,
            initiative=join_request.initiative,
            command=command
        )
        join_request.delete()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def access_list(self, request, *args, **kwargs):
        '''Список запросов на получение доступа'''
        command = self.get_object()
        requests = command.access_requests.all()
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def access_accept(self, request, *args, **kwargs):
        '''Принятие запроса на получени доступа к файлам'''
        command = self.get_object()
        serializer = self.get_serializer(request.data)
        access_request = get_object_or_404(
            command.access_requests.all(), 
            id=serializer.data['id']
        )
        command.whitelist.add(access_request.initiative)
        access_request.delete()
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def members(self, request, *args, **kwargs):
        '''Участники группы'''
        command = self.get_object()
        members = command.members.all()
        serializer = self.get_serializer(members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def posts(self, request, *args, **kwargs):
        '''Вывод постов участников группы'''
        command = self.get_object()
        posts = command.command_posts.annotate_likes(request.user) \
            .annotate(post_time=Trunc(
                    'timestamp', 
                    'minute', 
                    output_field=DateTimeField()
                )
            ) \
            .order_by('-timestamp')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def doc(self, request, *args, **kwargs):
        '''Все документы команды'''
        command = self.get_object()
        docs = command.docs.all()
        serializer = self.get_serializer(docs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def diagram(self, request, *args, **kwargs):
        '''Вывод диаграммы команды'''
        command = self.get_object()
        diagram = command.diagram
        diagram.is_admin = diagram.command.members.aggregate(
            is_admin=Count(
                'initiative',
                filter=Q(role='Администратор')
            )
        )['is_admin']
        diagram.is_initiator = diagram.command.members.aggregate(
            is_initiator=Count(
                'initiative',
                filter=Q(role='Инициатор')
            )
        )['is_initiator']
        serializer = self.get_serializer(diagram)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(initiator=self.request.user)

class CommandInfoViewSet(RetrieveUpdateViewSet):
    '''
    Обновление информации о команде
    Обзор информации о команде
    '''
    serializer_class = CommandUpdateInfoSerializer
    permission_classes = [CanChangeInfo]

    def get_queryset(self):
        return CommandInfo.objects.all()

class JoinRequestViewSet(PCreateDestroyViewSet):
    '''Создание и удаление запроса на добавление'''
    serializer_class = JoinRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsNotCommandMember]
    permission_classes_by_action = {
        'destroy': [OwnerInitiatorOrAdmin]
    }
    queryset = JoinRequest.objects.all()

    def perform_create(self, serializer):
        serializer.save(initiative=self.request.user)

class AccessRequestViewSet(PCreateDestroyViewSet):
    '''Создание и удаление запроса на добавление'''
    serializer_class = AccessRequestSerializer
    permission_classes = [permissions.IsAuthenticated, IsNotInWhitelist]
    permission_classes_by_action = {
        'destroy': [OwnerInitiatorOrAdmin]
    }
    queryset = AccessRequest.objects.all()

    def perform_create(self, serializer):
        serializer.save(initiative=self.request.user)

class MembershipViewSet(PUpdateDestroyViewSet):
    '''Обновление роли и выход из группы'''
    serializer_class = MembershipSerializer
    permission_classes = [permissions.IsAuthenticated, InitiatorOrAdmin]
    permission_classes_by_action = {
        'destroy': [permissions.IsAuthenticated, OwnerInitiatorOrAdmin]
    }
    queryset = Membership.objects.all()
