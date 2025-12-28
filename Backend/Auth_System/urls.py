from django.urls import path, include
from .views import FunctionSignup, FunctionPersonalDetails

urlpatterns = [
    path("signup/", FunctionSignup),
    path("personalsave/", FunctionPersonalDetails),
    
]