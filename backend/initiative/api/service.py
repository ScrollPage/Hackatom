from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.mixins import (
    ListModelMixin, 
    CreateModelMixin, 
    UpdateModelMixin, 
    DestroyModelMixin, 
    RetrieveModelMixin
)
from django.core.mail import send_mail
from django.conf import settings

# from django.conf import settings
# from django.core.mail import send_mail, EmailMultiAlternatives
# from django.template.loader import render_to_string
# from django.utils.html import strip_tags

from backend.celery import app as celery_app
from backend.service import (
    PermissionMixin, 
    SerializerMixin, 
    PermissionSerializerMixin,
    QueryMixin
)


class PSListRetrieveUpdateDestroyViewSet(
    PermissionSerializerMixin,
    GenericViewSet, RetrieveModelMixin,
    UpdateModelMixin, DestroyModelMixin,
    ListModelMixin, QueryMixin
):
    '''
    Обзор одной записи, обновление, удаление.
    Переопределены методы получения прав доступа и сериализатора.
    '''
    pass

@celery_app.task
def send_password_reset_email(user_email, key):
    send_mail(
        'Смена пароля',
        f'Перейдите по ссылке, чтобы завершить сменить пароль: {settings.REACT_DOMAIN}/password-reset?token={key}',
        settings.EMAIL_HOST_USER,
        [user_email],
        fail_silently=False
    )
