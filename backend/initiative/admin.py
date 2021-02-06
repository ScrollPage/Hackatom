from django.contrib import admin

from .models import (
    Initiative, InitiativeInfo, Category, 
    Requirenment, Review, Settings, Construct
)

admin.site.register(Initiative)
admin.site.register(InitiativeInfo)
admin.site.register(Category)
# admin.site.register(Requirenment)
admin.site.register(Review)
admin.site.register(Settings)
admin.site.register(Construct)