from rest_framework import serializers

from initiative.models import (
    Initiative, InitiativeInfo, 
    Category, Requirenment,
    Review, Settings, Construct
)
from backend.service import NameIdSerializer, NameSerializer

class EmailSerializer(serializers.Serializer):
    '''Сериализация мэйла'''
    email = serializers.CharField()

class TokenSerialzizer(serializers.Serializer):
    '''Сериализация ключа токена'''
    token = serializers.CharField(required=True)

class PasswordSerializer(TokenSerialzizer):
    '''Сериализация пароля'''
    password = serializers.CharField(required=True)

class NameIdSerializer(serializers.Serializer):
    '''Для категорий и потребностей'''
    id = serializers.IntegerField()
    name = serializers.CharField()

class InitiativeUpdateInfoSerializer(serializers.ModelSerializer):
    '''Сериализация информации о пользователе'''
    categories = NameSerializer(many=True)
    requirenments = NameSerializer(many=True)

    class Meta:
        model = InitiativeInfo
        exclude = ['id', 'initiative']

class InitiativeInfoSerializer(serializers.ModelSerializer):
    '''Сериализация информации о пользователе'''
    categories = NameIdSerializer(many=True)
    requirenments = NameIdSerializer(many=True)

    class Meta:
        model = InitiativeInfo
        exclude = ['id', 'initiative']

class ShortInitiativeSerializer(serializers.ModelSerializer):
    '''Короткая сериализация пользователя'''

    class Meta:
        model = Initiative
        fields = ['id', 'name', 'company']

class ReviewSerializer(serializers.ModelSerializer):
    '''Сериализация отзывов'''
    rate = serializers.IntegerField(read_only=True)
    initiative = ShortInitiativeSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['timestamp']
        extra_kwargs = {
            'estimated': {'write_only': True}
        }

class SettingsSerializer(serializers.ModelSerializer):
    '''Сериализация настроек'''

    class Meta:
        model = Settings
        exclude = ['id', 'initiative']

class ConstructSerializer(serializers.ModelSerializer):
    '''Сериализация конструктора'''

    class Meta:
        model = Construct
        exclude = ['initiative']

class InitiativeSerializer(serializers.ModelSerializer):
    '''Для сериализации пользователя'''
    info = InitiativeInfoSerializer(read_only=True)
    rate = serializers.DecimalField(max_digits=2, decimal_places=1, read_only=True)
    has_chat = serializers.BooleanField(read_only=True)
    chat_id = serializers.IntegerField(read_only=True)
    num_notifications = serializers.IntegerField(read_only=True)
    num_unread_chats = serializers.IntegerField(read_only=True)
    num_reviews = serializers.IntegerField(read_only=True)
    settings = SettingsSerializer(read_only=True)

    class Meta:
        model = Initiative
        fields = [
            'id', 'email', 'first_name', 'last_name', 'phone_number',
            'name', 'company', 'is_superuser', 'info', 'rate', 'has_chat',
            'chat_id', 'num_notifications', 'num_unread_chats', 'num_reviews',
            'settings', 'is_steakholder', 'first_login']
            
        read_only_fields = ['is_superuser']