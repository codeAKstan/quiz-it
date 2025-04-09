from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from .models import User, UserTopic, QuizCategory, TopRank, PasswordResetEmail

# Register the User model with a custom UserAdmin
# Register the User model
@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'points', 'rank', 'badges', 'is_staff', 'is_active', )
    list_filter = ('is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('username',)
    
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Profile', {'fields': ('first_name', 'last_name', 'profile_image', 'bio')}),
        ('Statistics', {'fields': ('points', 'rank', 'badges')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    
    readonly_fields = ('last_login', 'date_joined')
    
    def profile_image_display(self, obj):
        if obj.profile_image:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />', obj.profile_image.url)
        return "No Image"
    
    profile_image_display.short_description = 'Profile Image'

# Register the UserTopic model
@admin.register(UserTopic)
class UserTopicAdmin(admin.ModelAdmin):
    list_display = ('user', 'topic')
    list_filter = ('user',)
    search_fields = ('user__username', 'topic')
    ordering = ('user',)
    autocomplete_fields = ['user']

# Register the QuizCategory model
@admin.register(QuizCategory)
class QuizCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'questions', 'icon_display')
    search_fields = ('name', 'description')
    list_filter = ('questions',)
    
    def icon_display(self, obj):
        if obj.icon:
            return format_html('<img src="{}" width="30" height="30" />', obj.icon.url)
        return "No Icon"
    
    icon_display.short_description = 'Icon'

# Register the TopRank model
@admin.register(TopRank)
class TopRankAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'points')
    list_filter = ('title',)
    search_fields = ('user__username', 'title')
    ordering = ('-points',)
    autocomplete_fields = ['user']

# Register the PasswordResetEmail model
@admin.register(PasswordResetEmail)
class PasswordResetEmailAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'status', 'created_at', 'updated_at', 'completed_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'email')
    readonly_fields = ('task_id', 'token', 'ip_address', 'user_agent', 'created_at', 'updated_at', 'completed_at')
    ordering = ('-created_at',)
    autocomplete_fields = ['user']
    
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'email')
        }),
        ('Reset Information', {
            'fields': ('status', 'token', 'task_id')
        }),
        ('Request Information', {
            'fields': ('ip_address', 'user_agent')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'completed_at'),
            'classes': ('collapse',),
        }),
    )
    
    def has_add_permission(self, request):
        # Prevent manual creation of reset records
        return False
    
    def has_change_permission(self, request, obj=None):
        # Only allow changing the status
        return True
    
    def get_readonly_fields(self, request, obj=None):
        if obj:
            # Make all fields except status read-only when editing
            return [f.name for f in obj._meta.fields if f.name != 'status']
        return self.readonly_fields

