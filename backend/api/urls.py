from django.urls import path
from .views import ImageUploadView

urlpatterns = [
    path('submit/', ImageUploadView.as_view())
]