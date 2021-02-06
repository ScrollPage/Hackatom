from rest_framework.generics import CreateAPIView
from rest_framework import permissions

from feedback.models import Rating
from .serializers import RatingSerializer

class RatingCreateView(CreateAPIView):
    '''Создание рейтинга'''
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]