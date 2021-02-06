from django.contrib import admin

from .models import Like, Rating, Star

admin.site.register(Like)
admin.site.register(Rating)
admin.site.register(Star)