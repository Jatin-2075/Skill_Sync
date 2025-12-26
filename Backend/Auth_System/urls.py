from django.urls import path, include
from .views import Signup

urlpatterns = [
    path("signup/", Signup)
]