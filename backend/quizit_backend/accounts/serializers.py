from rest_framework import serializers
from .models import User, UserTopic, QuizCategory, TopRank
from django.conf import settings
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    profile_image = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'points',
            'rank',
            'badges',
            'profile_image',
            'bio'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'password': {'write_only': True},
            'points': {'read_only': True},
            'rank': {'read_only': True},
            'badges': {'read_only': True}
        }
    
    def get_profile_image(self, obj):
        """
        Custom method to get profile image URL
        Returns None if no image is uploaded
        Returns absolute URL for frontend consumption
        """
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None
    
    def create(self, validated_data):
        """
        Create and return a new User instance
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data.get('password')
        )
        return user

class UserTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTopic
        fields = ['user', 'topic']

class QuizCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizCategory
        fields = ['id', 'name', 'description', 'questions', 'icon']

class TopRankSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = TopRank
        fields = ['username', 'title', 'points']


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    def validate(self, attrs):
        # Validate that the passwords match
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Password fields didn't match."})
        
        # Validate password strength
        validate_password(attrs['password'])
        
        return attrs