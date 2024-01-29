# yourapp/serializers.py

from rest_framework import serializers
from .models import ImageInfo

class ImgInfoModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageInfo
        # fields = ['user', 'image_base64']
        fields = '__all__'



from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
