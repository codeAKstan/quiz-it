from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    
    # Profile-related fields
    points = models.IntegerField(default=0)
    rank = models.IntegerField(default=0)
    badges = models.IntegerField(default=0)
    
    # Profile image with validation for file types
    profile_image = models.ImageField(
        upload_to='profile_images/', 
        null=True, 
        blank=True,
        validators=[FileExtensionValidator(['png', 'jpg', 'jpeg', 'svg'])]
    )
    
    # Optional additional profile fields
    bio = models.TextField(max_length=500, blank=True, null=True)
    
    def __str__(self):
        return self.username
    
    def update_points(self, points_earned):
        """
        Method to update user points
        """
        self.points += points_earned
        self.save()
    
    def update_rank(self, new_rank):
        """
        Method to update user rank
        """
        self.rank = new_rank
        self.save()
    
    def award_badge(self):
        """
        Method to increment badges
        """
        self.badges += 1
        self.save()

class UserTopic(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='topics')
    topic = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.user.username} - {self.topic}"

class QuizCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    questions = models.IntegerField(default=0)
    icon = models.ImageField(
        upload_to='quiz_category_icons/', 
        null=True, 
        blank=True,
        validators=[FileExtensionValidator(['png', 'jpg', 'jpeg', 'svg'])]
    )
    
    def __str__(self):
        return self.name

class TopRank(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    points = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"
    
    class Meta:
        ordering = ['-points']
        verbose_name_plural = "Top Ranks"

class PasswordResetEmail(models.Model):
    """Model to track password reset email status"""
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('SENT', 'Sent'),
        ('FAILED', 'Failed'),
        ('CLICKED', 'Clicked'),
        ('COMPLETED', 'Completed'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField()
    task_id = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='PENDING')
    token = models.CharField(max_length=255)  # Store token to validate later
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        
    def __str__(self):
        return f"Password reset for {self.email} ({self.status})"
        
    def mark_as_sent(self):
        self.status = 'SENT'
        self.save()
        
    def mark_as_clicked(self):
        self.status = 'CLICKED'
        self.save()
        
    def mark_as_completed(self):
        from django.utils import timezone
        self.status = 'COMPLETED'
        self.completed_at = timezone.now()
        self.save()