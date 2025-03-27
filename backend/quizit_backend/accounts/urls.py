from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    UserTopicView, 
    UserProfileView, 
    QuizCategoryView, 
    TopRankView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('topics/', UserTopicView.as_view(), name='topics'),
    path('user/', UserProfileView.as_view(), name='user_profile'),
    path('quiz-categories/', QuizCategoryView.as_view(), name='quiz_categories'),
    path('top-ranks/', TopRankView.as_view(), name='top_ranks'),
]