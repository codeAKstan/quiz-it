from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserTopic

# Register the User model with a custom UserAdmin
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active') 
    list_filter = ('is_staff', 'is_active') 
    search_fields = ('username', 'email')  
    ordering = ('username',)  

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )

# Register the User model
admin.site.register(User, CustomUserAdmin)

# Register the UserTopic model
@admin.register(UserTopic)
class UserTopicAdmin(admin.ModelAdmin):
    list_display = ('user', 'topic') 
    list_filter = ('user',) 
    search_fields = ('user__username', 'topic')  
    ordering = ('user',)  