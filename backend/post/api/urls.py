from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import PostViewSet, CommentViewSet

urlpatterns = [

]



r = DefaultRouter()
r.register('post', PostViewSet, basename='post-detail')
urlpatterns += r.urls
r = DefaultRouter()
r.register('comment', CommentViewSet, basename='comment')
urlpatterns += r.urls