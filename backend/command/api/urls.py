from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    CommandViewSet, CommandInfoViewSet, 
    JoinRequestViewSet, MembershipViewSet,
    AccessRequestViewSet
)

urlpatterns = [

]

command_detail = CommandViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

command_list = CommandViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

command_join = CommandViewSet.as_view({
    'get': 'join_list',
    'post': 'join_accept',
})

command_access = CommandViewSet.as_view({
    'get': 'access_list',
    'post': 'access_accept',
})

command_members = CommandViewSet.as_view({
    'get': 'members',
})

command_posts = CommandViewSet.as_view({
    'get': 'posts'
})

command_docs = CommandViewSet.as_view({
    'get': 'doc'
})

command_diagram = CommandViewSet.as_view({
    'get': 'diagram'
})

urlpatterns += [
    path('command/', command_list, name='command-list'),
    path('command/<int:pk>/', command_detail, name='command-detail'),
    path('command/<int:pk>/doc/', command_docs, name='comamnd-docs'),
    path('command/<int:pk>/join/', command_join, name='command-join'),
    path('command/<int:pk>/post/', command_posts, name='command-posts'),
    path('command/<int:pk>/access/', command_access, name='command-access'),
    path('command/<int:pk>/diagram/', command_diagram, name='command-diagram'),
    path('command/<int:pk>/members/', command_members, name='command-members')
]

r = DefaultRouter()
r.register('command/info', CommandInfoViewSet, basename='command-info')
urlpatterns += r.urls 
r = DefaultRouter()
r.register('request/join', JoinRequestViewSet, basename='request-join')
urlpatterns += r.urls 
r = DefaultRouter()
r.register('membership', MembershipViewSet, basename='membership-detail')
urlpatterns += r.urls 
r = DefaultRouter()
r.register('request/access', AccessRequestViewSet, basename='request-access')
urlpatterns += r.urls 


