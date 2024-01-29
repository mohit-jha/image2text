# yourapp/urls.py

from django.urls import path
from .views import LoginView, UploadImage

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('upload-image/', UploadImage.upload_image, name='upload-image'),
    
    # Add other URLs as needed
]
