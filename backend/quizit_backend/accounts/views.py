from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, UserTopic, QuizCategory, TopRank, PasswordResetEmail
from .serializers import (
    UserSerializer, 
    UserTopicSerializer, 
    QuizCategorySerializer, 
    TopRankSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, smart_str
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string




import logging
logger = logging.getLogger(__name__)

class RegisterView(APIView):
    def post(self, request):
        logger.info(f"Received registration data: {request.data}")
        
        # Validate serializer
        serializer = UserSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                user = serializer.save()
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'token': str(refresh.access_token),
                    'refresh_token': str(refresh),
                    'user': UserSerializer(user, context={'request': request}).data
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
            
            # Serialize user data with request context
            user_serializer = UserSerializer(user, context={'request': request})
            
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
        serializer = UserSerializer(user, context={'request': request})
        
        # Additional user details
        user_data = serializer.data
        user_data.update({
            'topics': UserTopicSerializer(user.topics.all(), many=True).data
        })
        
        return Response(user_data)
    
    def patch(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True, context={'request': request})
        
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
    





class ProfileImageUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request):
        user = request.user
        
        # Check if an image was provided in the request
        if 'profile_image' not in request.FILES:
            return Response({'detail': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update the user's profile image
        user.profile_image = request.FILES['profile_image']
        user.save()
        
        # Return the updated user data with request context
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    






from .tasks import send_password_reset_email

class PasswordResetRequestView(APIView):
    """
    API view to request a password reset
    """
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                # Generate token
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                
                # Create reset link - Replace with your frontend URL
                reset_url = f"{settings.FRONTEND_URL}/reset-password/confirm/{uid}/{token}/"
                
                # Create tracking record
                reset_email = PasswordResetEmail.objects.create(
                    user=user,
                    email=user.email,
                    token=token,
                    ip_address=self.get_client_ip(request),
                    user_agent=request.META.get('HTTP_USER_AGENT', ''),
                    status='PENDING'
                )
                
                # Send email asynchronously with Celery
                task = send_password_reset_email.delay(
                    user_id=user.id,
                    username=user.username,
                    email=user.email,
                    reset_url=reset_url
                )
                
                # Update tracking record with task ID
                reset_email.task_id = task.id
                reset_email.save()
                
                return Response(
                    {"detail": "Password reset email has been sent."},
                    status=status.HTTP_200_OK
                )
            except User.DoesNotExist:
                # We don't want to reveal which emails exist in our system
                return Response(
                    {"detail": "Password reset email has been sent if the email exists."},
                    status=status.HTTP_200_OK
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_client_ip(self, request):
        """Get the client's IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

class PasswordResetConfirmView(APIView):
    """
    API view to confirm password reset with token and set new password
    """
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            uid = serializer.validated_data['uid']
            token = serializer.validated_data['token']
            password = serializer.validated_data['password']
            
            try:
                # Decode the UID to get User PK
                user_id = smart_str(urlsafe_base64_decode(uid))
                user = User.objects.get(pk=user_id)
                
                # Check if token is valid
                if default_token_generator.check_token(user, token):
                    # Set new password
                    user.set_password(password)
                    user.save()
                    
                    # Update tracking record
                    try:
                        reset_email = PasswordResetEmail.objects.filter(
                            user=user,
                            token=token,
                            status__in=['PENDING', 'SENT', 'CLICKED']
                        ).latest('created_at')
                        
                        reset_email.mark_as_completed()
                    except PasswordResetEmail.DoesNotExist:
                        pass
                    
                    return Response(
                        {"detail": "Password has been reset successfully."},
                        status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {"detail": "Invalid or expired token."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                return Response(
                    {"detail": "Invalid reset link."},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from django.http import HttpResponseRedirect

class PasswordResetTrackingView(APIView):
    """
    View to track when a user clicks on a password reset link
    """
    def get(self, request, uid, token):
        try:
            # Decode the UID to get User PK
            user_id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
            
            # Find the related reset email record
            reset_email = PasswordResetEmail.objects.filter(
                user=user,
                token=token,
                status__in=['PENDING', 'SENT']
            ).latest('created_at')
            
            # Mark as clicked
            reset_email.mark_as_clicked()
            
            # Redirect to the actual reset page
            return HttpResponseRedirect(f"{settings.FRONTEND_URL}/reset-password/confirm/{uid}/{token}/")
            
        except (TypeError, ValueError, OverflowError, User.DoesNotExist, PasswordResetEmail.DoesNotExist):
            # Still redirect but don't update any records
            return HttpResponseRedirect(f"{settings.FRONTEND_URL}/reset-password/confirm/{uid}/{token}/")
