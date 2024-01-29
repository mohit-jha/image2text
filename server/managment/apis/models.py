from django.db import models
from django.contrib.auth.models import User  # Import the User model

class ImageInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_base64 = models.TextField()
