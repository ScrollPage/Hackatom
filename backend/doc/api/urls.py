from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import PDocViewSet, ChatDocView

urlpatterns = [
    path('chatdoc/', ChatDocView.as_view(), name='chatdoc')
]

r = DefaultRouter()
r.register('doc', PDocViewSet, basename='doc')
urlpatterns += r.urls 