from django.contrib import admin

from .models import (
    Command,
    CommandInfo, 
    JoinRequest, 
    AccessRequest, 
    Requirenment, 
    Membership
)

admin.site.register(Command)
admin.site.register(CommandInfo)
admin.site.register(JoinRequest)
admin.site.register(AccessRequest)
admin.site.register(Requirenment)
admin.site.register(Membership)
