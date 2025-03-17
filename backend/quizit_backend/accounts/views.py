from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, UserTopic
from .serializers import UserSerializer, UserTopicSerializer
import logging

logger = logging.getLogger(__name__)

class RegisterView(APIView):
    def post(self, request):
        logger.info(f"Received data: {request.data}")  # Log the request data
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.error(f"Validation errors: {serializer.errors}")  # Log validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class UserTopicView(APIView):
    def post(self, request):
        user_id = request.data.get('user')
        topics = request.data.get('topics', [])

        # Save each topic for the user
        for topic in topics:
            UserTopic.objects.create(user_id=user_id, topic=topic)

        return Response({'message': 'Topics saved successfully'}, status=status.HTTP_201_CREATED)