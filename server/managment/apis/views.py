from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from .models import ImageInfo
from .serializers import ImgInfoModelSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
# import cv2
# import numpy as np
from io import BytesIO
from PIL import Image 
import base64
import pytesseract

def base64_to_image(base64_string):
    image_data = base64.b64decode(base64_string.split(',')[1])
    image = Image.open(BytesIO(image_data))
    return image

def ocr_from_image(image):
    text = pytesseract.image_to_string(image)
    return text.replace('\n',' ')


def fix_base64_padding(base64_string):
    # Add padding characters if necessary
    missing_padding = len(base64_string) % 4
    if missing_padding:
        base64_string += '=' * (4 - missing_padding)
    return base64_string

class UploadImage2(generics.CreateAPIView):
    queryset = ImageInfo.objects.all()
    serializer_class = ImgInfoModelSerializer

    def create(self, request, *args, **kwargs):
        # Extract the user from the token
        user = request.user
        # Ensure that the user is authenticated
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Get base64 text from the request data
        base64_text = request.data.get('base64_text', None)

        # Check if base64_text is provided
        if not base64_text:
            return Response({'detail': 'Base64 text not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # Perform any additional processing on base64_text if needed

        # Create a new instance of ImageInfo
        serializer = self.get_serializer(data={'base64_text': base64_text, 'user': user.id})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Declare headers variable
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)



class UploadImage3(generics.CreateAPIView):
    queryset = ImageInfo.objects.all()
    serializer_class = ImgInfoModelSerializer

    def create(self, request, *args, **kwargs):
        # Extract the user from the token
        user = request.user
        # Ensure that the user is authenticated
        if not user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Get base64 text from the request data
        base64_text = request.data.get('base64_text', None)
        print(base64_text,'base64_text')

        # Check if base64_text is provided
        if not base64_text:
            return Response({'detail': 'Base64 text not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # Perform any additional processing on base64_text if needed

        # Create a new instance of ImageInfo
        serializer = self.get_serializer(data={'image_base64': base64_text, 'user': user.id})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # Declare headers variable
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class UploadImage:
    @staticmethod
    @api_view(['POST'])
    # @permission_classes([IsAuthenticated])
    def upload_image(request, *args, **kwargs):
        # Extract the user from the token
        user = request.user

        # Get base64 text from the request data
        base64_text = request.data.get('base64_text', None)

        # Check if base64_text is provided
        if not base64_text:
            return Response({'detail': 'Base64 text not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # Perform any additional processing on base64_text if needed

        # Create a new instance of ImageInfo
        # serializer = ImgInfoModelSerializer(data={'image_base64': base64_text, 'user': user.id})
        # serializer.is_valid(raise_exception=True)
        # serializer.save()

      
        b64img = base64_to_image(base64_text)
        ocr =  ocr_from_image(b64img)
        return Response(ocr, status=status.HTTP_201_CREATED)

class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            request,
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
