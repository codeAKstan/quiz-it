from django.urls import path
from .views import RegisterView, LoginView, UserTopicView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('topics/', UserTopicView.as_view(), name='topics'),
]