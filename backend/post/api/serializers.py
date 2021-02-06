from rest_framework import serializers
from rest_framework.exceptions import ParseError

from post.models import Post, Comment
from initiative.api.serializers import ShortInitiativeSerializer
    
class CommentSerializer(serializers.ModelSerializer):
    '''Сериализация комментариев'''
    initiative = ShortInitiativeSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['initiative', 'timestamp']
        extra_kwargs = {
            'post': {'write_only': True}
        }

class PostSerializer(serializers.ModelSerializer):
    '''Сериализация поста'''
    initiative = ShortInitiativeSerializer(read_only=True)
    num_likes = serializers.IntegerField(read_only=True)
    is_liked = serializers.BooleanField(read_only=True)
    post_time = serializers.DateTimeField(read_only=True)
    last_comment = CommentSerializer(read_only=True)
    num_comments = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        exclude = ['timestamp']

    def validate(self, attrs):
        data = self.context['request'].data
        if data.get('title', None) or data.get('picture', None):
            return super().validate(attrs)
        raise ParseError('You need either picture or title.')