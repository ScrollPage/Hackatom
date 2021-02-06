from django.urls import path

from .views import RatingCreateView

urlpatterns = [
    path('rating/', RatingCreateView.as_view(), name='rating-create')
]