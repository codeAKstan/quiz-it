from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, UserTopic, QuizCategory, TopRank
from .serializers import (
    UserSerializer, 
    UserTopicSerializer, 
    QuizCategorySerializer, 
    TopRankSerializer
)

import logging
logger = logging.getLogger(__name__)

class RegisterView(APIView):
    def post(self, request):
        logger.info(f"Received registration data: {request.data}")
        
        # Validate serializer
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Registration error: {str(e)}")
                return Response({'detail': 'Registration failed'}, status=status.HTTP_400_BAD_REQUEST)
        
        logger.error(f"Validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Try authentication with both username and email
        user = None
        if '@' in username:
            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass
        
        if not user:
            user = authenticate(username=username, password=password)
        
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Serialize user data
            user_serializer = UserSerializer(user)
            
            return Response({
                'token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({'detail': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

class UserTopicView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        topics = request.data.get('topics', [])
        
        # Save each topic for the user
        created_topics = []
        for topic in topics:
            user_topic, created = UserTopic.objects.get_or_create(
                user=user, 
                topic=topic
            )
            created_topics.append(UserTopicSerializer(user_topic).data)
        
        return Response({
            'message': 'Topics saved successfully',
            'topics': created_topics
        }, status=status.HTTP_201_CREATED)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        
        # Additional user details
        user_data = serializer.data
        user_data.update({
            'topics': UserTopicSerializer(user.topics.all(), many=True).data
        })
        
        return Response(user_data)
    
    def patch(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuizCategoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # You might want to modify this based on your specific requirements
        categories = QuizCategory.objects.all()
        serializer = QuizCategorySerializer(categories, many=True)
        return Response(serializer.data)

class TopRankView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        top_ranks = TopRank.objects.all()[:5]
        serializer = TopRankSerializer(top_ranks, many=True)
        return Response(serializer.data)