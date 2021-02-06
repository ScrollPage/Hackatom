from rest_framework.routers import DefaultRouter

from .views import ChatViewSet

urlpatterns = [

]

r = DefaultRouter()
r.register('chat', ChatViewSet, basename='chat')
urlpatterns += r.urls 
