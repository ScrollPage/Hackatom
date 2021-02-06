from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import TaskViewSet, InitiativeTaskViewSet

urlpatterns = [
    
]

task_detail = TaskViewSet.as_view({
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

task_create = TaskViewSet.as_view({
    'post': 'create'
})

task_self_create = TaskViewSet.as_view({
    'post': 'self_create'
})

urlpatterns += [
    path('task/<int:pk>/', task_detail, name='task-detail'),
    path('task/', task_create, name='task'),
    path('task/self/', task_self_create, name='task-self'),
]

r = DefaultRouter()
r.register('initiativetask', InitiativeTaskViewSet, basename='initiativetask')
urlpatterns += r.urls