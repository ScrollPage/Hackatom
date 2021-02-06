from rest_framework import serializers

from feedback.models import Rating

class RatingSerializer(serializers.ModelSerializer):
    '''Сериализация лайка'''

    class Meta:
        model = Rating
        fields = ['star', 'initiative']

    def create(self, validated_data):
        rating, _ = Rating.objects.update_or_create(
            appraiser=self.context['request'].user,
            initiative=validated_data.get('initiative', None),
            defaults={'star': validated_data.get('star')}
        )

        return rating