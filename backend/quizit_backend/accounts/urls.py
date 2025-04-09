from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    UserTopicView, 
    UserProfileView, 
    QuizCategoryView, 
    TopRankView,
    ProfileImageUploadView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    PasswordResetTrackingView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('topics/', UserTopicView.as_view(), name='topics'),
    path('user/', UserProfileView.as_view(), name='user_profile'),
     path('user/profile-image/', ProfileImageUploadView.as_view(), name='profile_image_upload'),
    path('quiz-categories/', QuizCategoryView.as_view(), name='quiz_categories'),
    path('top-ranks/', TopRankView.as_view(), name='top_ranks'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password-reset/track/<str:uid>/<str:token>/', PasswordResetTrackingView.as_view(), name='password_reset_tracking'),
]