from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.generics import UpdateAPIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin
from rest_framework.generics import ListAPIView
from django.db.models.functions import Trunc
from django.shortcuts import get_object_or_404
from django.db.models import DateTimeField, Q, Count, Avg
from django.db.models.functions import Abs
from django.http import QueryDict
from django.conf import settings

from url_filter.integrations.drf import DjangoFilterBackend

from backend.service import (
    RetrieveUpdateViewSet, MembershipSerializer, 
    PCreateDestroyViewSet, IsOwner
)
from diagram.api.serializers import InitiativeTaskSerializer
from post.api.serializers import PostSerializer
from notifications.api.serializers import NotificatonSerializer
from post.models import Post
from .serializers import (
    TokenSerialzizer, InitiativeSerializer, 
    InitiativeInfoSerializer, NameIdSerializer,
    InitiativeUpdateInfoSerializer, ReviewSerializer,
    SettingsSerializer, ConstructSerializer,
    PasswordSerializer, EmailSerializer
)
from .service import (
    PSListRetrieveUpdateDestroyViewSet, 
    send_password_reset_email
)
from initiative.models import (
    Initiative, InitiativeInfo, 
    Category, Requirenment,
    Review, Settings, Construct
)
from backend.service import SerializerMixin
from .permissions import IsRightUser, NotYourself, IsSteakHolderOrSelf

class InitiativeActions(SerializerMixin, GenericViewSet):
    '''Активация аккаунта'''

    serializer_class = TokenSerialzizer
    serializer_class_by_action = {
        'password_reset': PasswordSerializer,
        'email_password_reset': EmailSerializer
    }
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def activate(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        key = serializer.data.get('token')
        token = get_object_or_404(Token, key=key)
        user = token.user
        user.is_active = True
        user.save()
        token.delete()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def password_reset(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        key = serializer.data.get('token')
        token = get_object_or_404(Token, key=key)
        user = token.user
        user.set_password(serializer.data.get('password'))
        user.save()
        token.delete()
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def email_password_reset(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        user = get_object_or_404(Initiative, email=email)
        token = Token.objects.create(user=user)
        send_password_reset_email.delay(user.email, token.key)
        return Response(status=status.HTTP_200_OK)

class InitiativeViewSet(PSListRetrieveUpdateDestroyViewSet):
    '''
    Обзор страницы инициативы
    Обновление информации на странице
    Удаление страницы
    '''
    serializer_class = InitiativeSerializer
    serializer_class_by_action = {
        'posts': PostSerializer,
        'commands': MembershipSerializer,
        'reviews': ReviewSerializer,
        'construct': ConstructSerializer,
        'diagram': InitiativeTaskSerializer

    }
    permission_classes = [permissions.IsAuthenticated, IsRightUser]
    permission_classes_by_action = {
        'me': [permissions.IsAuthenticated],
        'list': [permissions.IsAuthenticated],
        'retrieve': [permissions.IsAuthenticated],
        'posts': [permissions.IsAuthenticated],
        'commands': [permissions.IsAuthenticated],
        'reviews': [permissions.IsAuthenticated],
        'diagram': [permissions.IsAuthenticated],
        'construct': [permissions.IsAuthenticated]
    }
    filter_backends = [DjangoFilterBackend]
    filter_fields = '__all__'

    def get_queryset(self):
        queryset = Initiative.objects.all()

        if self.action in settings.READ_ACTIONS:
            queryset = queryset \
                .annotate(rate=Avg('rating__star')) \
                .annotate(has_chat=Count(
                        'chats', 
                        filter=Q(
                            chats__members__in=[self.request.user], 
                            chats__is_chat=True
                        ), 
                        distinct=True
                    )
                ) \
                .annotate(chat_id=Avg(
                        'chats__id', 
                        filter=Q(
                            chats__members__in=[self.request.user], 
                            chats__is_chat=True
                        ), 
                    )
                ) \
                .annotate(num_reviews=Count('reviews', distinct=True)) \
                .order_by(self.request.query_params.get('sort', 'name'))
        return queryset

    @action(detail=True, methods=['get'])
    def me(self, request, *args, **kwargs):
        '''Вывод собственной страницы'''
        user = self.get_queryset().get(id=self.request.user.id)
        user.num_notifications = user.notifications \
            .aggregate(num_notes=Count('id', filter=Q(seen=False)))['num_notes']
        # print(user.chats.filter(messages__is_read=False).distinct('id'))
        # user.num_unread_chats = user.chats.filter(messages__is_read=False).count()
        serializer = self.get_serializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def posts(self, request, *args, **kwargs):
        '''Вывод постов на странице'''
        user = self.get_object()
        posts = Post.objects.annotate_likes(request.user).filter(initiative=user) \
            .filter(command=None) \
            .annotate(post_time=Trunc(
                'timestamp', 
                'minute', 
                output_field=DateTimeField()
                )
            ) \
            .annotate(num_comments=Count('comments', distinct=True)) \
            .order_by('-timestamp')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def commands(self, request, *args, **kwargs):
        '''Группы пользователя'''
        initiative = self.get_object()
        commands = initiative.commands.all()
        serializer = self.get_serializer(commands, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def reviews(self, request, *args, **kwargs):
        '''Отзывы пользователя'''
        initiative = self.get_object()
        reviews = initiative.reviews.all() \
            .annotate(rate=Abs(
                'initiative__rating__star__value', 
                filter=Q(initiative=request.user)
                )
            )
        serializer = self.get_serializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def set_settings(self, request, *args, **kwargs):
        '''Отзывы пользователя'''
        initiative = self.get_object()
        settings = initiative.settings
        serializer = self.get_serializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def construct(self, request, *args, **kwargs):
        '''Конструктор инициативы'''
        initiative = self.get_object()
        construct = initiative.construct
        serializer = self.get_serializer(construct)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def diagram(self, request, *args, **kwargs):
        initiative = self.get_object()
        tasks = initiative.my_tasks.all()
        serializer = self.get_serializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class IniativeInfoViewSet(RetrieveUpdateViewSet):
    '''Обновление информации о пользователе'''
    serializer_class = InitiativeUpdateInfoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return InitiativeInfo.objects.filter(initiative=self.request.user)

class CategoryListView(ListAPIView):
    '''Вывод всех категорий'''
    serializer_class = NameIdSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Category.objects.all()

class RequirenmentListView(ListAPIView):
    '''Вывод всех потребностей'''
    serializer_class = NameIdSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Requirenment.objects.all()

class ReviewViewSet(PCreateDestroyViewSet):
    '''
    Создание отзыва
    Удаление отзыва
    '''
    serializer_class =  ReviewSerializer
    permission_classes = [permissions.IsAuthenticated, NotYourself]
    permission_classes_by_action = {
        'destroy': [permissions.IsAuthenticated, IsOwner]
    }
    queryset = Review.objects.all()

    def perform_create(self, serialzier):
        serialzier.save(initiative=self.request.user)

class SettingsUpdateView(UpdateAPIView):
    '''Обновление настроек'''
    serializer_class = SettingsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Settings.objects.filter(initiative=self.request.user)

class ConstructUpdateView(UpdateAPIView):
    '''Обновление конструктора'''
    serializer_class = ConstructSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Construct.objects.filter(initiative=self.request.user)