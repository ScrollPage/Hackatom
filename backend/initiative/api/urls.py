from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter

from .views import (
    InitiativeActions, InitiativeViewSet, 
    IniativeInfoViewSet, CategoryListView, 
    RequirenmentListView, ReviewViewSet,
    SettingsUpdateView, ConstructUpdateView
)

urlpatterns = [
    path('construct/<int:pk>/', ConstructUpdateView.as_view(), name='construct-update'),
    path('category/', CategoryListView.as_view(), name='category-list'),
    path('requirenment/', RequirenmentListView.as_view(), name='requirenment-list'),
    path('initiative/<int:pk>/settings/', SettingsUpdateView.as_view(), name='settings'),
]

activate = InitiativeActions.as_view({
    'post': 'activate'
})

password_reset = InitiativeActions.as_view({
    'post': 'password_reset'
})

email_password_reset = InitiativeActions.as_view({
    'post': 'email_password_reset'
}) 

initiative_retrieve = InitiativeViewSet.as_view({
    'get': 'retrieve',
    'delete': 'destroy',
    'put': 'update',
    'patch': 'partial_update'
})

initiative_list = InitiativeViewSet.as_view({
    'get': 'list',
})

initiative_me = InitiativeViewSet.as_view({
    'get': 'me',
})

initiative_posts = InitiativeViewSet.as_view({
    'get': 'posts'
})

initiative_commands = InitiativeViewSet.as_view({
    'get': 'commands'
})

initiative_reviews = InitiativeViewSet.as_view({
    'get': 'reviews'
})

initiative_settings = InitiativeViewSet.as_view({
    'get': 'set_settings'
})

initiative_construct = InitiativeViewSet.as_view({
    'get': 'construct'
})

initiative_diagram = InitiativeViewSet.as_view({
    'get': 'diagram'
})

urlpatterns += [
    path('activate/', activate, name='activate'),
    path('password/reset/', password_reset, name='password-reset'),
    path('password/reset/email/', email_password_reset, name='password-reset-email'),
    path('initiative/<int:pk>/', initiative_retrieve, name='initiative-detail'),
    path('initiative/<int:pk>/post/', initiative_posts, name='initiative-post'),
    path('initiative/<int:pk>/review/', initiative_reviews, name='initiative-reviews'),
    path('initiative/<int:pk>/command/', initiative_commands, name='initiative-commands'),
    path('initiative/<int:pk>/diagram/', initiative_diagram, name='initiative-diagram'),
    path('initiative/<int:pk>/construct/', initiative_construct, name='initiative-construct'),
    path('initiative/', initiative_list, name='initiative-list'),
    path('initiative/me/', initiative_me, name='initiative-me'),
]

r = DefaultRouter()
r.register('initiative/info', IniativeInfoViewSet, basename='initiative-info')
urlpatterns += r.urls
r = DefaultRouter()
r.register('review', ReviewViewSet, basename='review')
urlpatterns += r.urls