from django.urls import path, include
from .views import FunctionSignup, FunctionSaveProfile

urlpatterns = [
    path("signup/", FunctionSignup),
    path("personalsave/", FunctionSaveProfile),
    
]