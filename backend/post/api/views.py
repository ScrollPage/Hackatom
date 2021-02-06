from rest_framework import permissions, status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Subquery, DateTimeField, Count
from django.db.models.functions import Trunc

from backend.service import EmptySerializer, PCreateDestroyViewSet, IsOwner
from .service import PSListCreateDestroyViewSet
from .permissions import IsInCommand
from .serializers import PostSerializer, CommentSerializer
from post.models import Post, Comment
from feedback.models import Like

class PostViewSet(PSListCreateDestroyViewSet):
    '''
    Список постов
    Создание поста
    Удаление поста
    '''
    serializer_class = PostSerializer
    serializer_class_by_action = {
        'like': EmptySerializer,
        'comment': CommentSerializer
    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {
        'delete': [IsOwner],
        'create': [permissions.IsAuthenticated, IsInCommand]
    }

    def get_queryset(self):
        return Post.objects.annotate_likes(self.request.user) \
            .annotate(num_comments=Count('comments', distinct=True)) \
            .order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(initiative=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, *args, **kwargs):
        '''Добавление лайка к посту'''
        post = self.get_object()
        like, fl = Like.objects.get_or_create(post=post, initiative=request.user)
        if fl:
            return Response(status=status.HTTP_200_OK)
        else:
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'])
    def comment(self, request, *args, **kwargs):
        '''Комментарии к посту'''
        post = self.get_object()
        comments = post.comments.all().order_by('-timestamp')
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def feed(self, request, *args, **kwargs):
        '''Вывод новостей пользователя'''
        posts = Post.objects.annotate_likes(request.user).filter(
            command__in=Subquery(request.user.commands.values_list('command__id'))
        ) \
            .annotate(num_comments=Count('comments', distinct=True)) \
            .annotate(post_time=Trunc('timestamp', 'minute', output_field=DateTimeField()))

        user_posts = request.user.posts.annotate_likes(request.user) \
            .annotate(num_comments=Count('comments', distinct=True)) \
            .annotate(post_time=Trunc('timestamp', 'minute', output_field=DateTimeField()))
        
        posts = posts.union(user_posts).order_by('-timestamp')
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
class CommentViewSet(PCreateDestroyViewSet):
    '''
    Создание комментария
    Удаление комментария
    '''
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {
        'destroy': [IsOwner]
    }

    def get_queryset(self):
        return Comment.objects.filter(initiative=self.request.user)

    def perform_create(self, serializer):
        serializer.save(initiative=self.request.user)