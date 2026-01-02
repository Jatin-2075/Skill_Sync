from django.urls import path, include
from .views import FunctionSignup, FunctionsSavePersonal

urlpatterns = [
    path("signup/", FunctionSignup),
    path("personalsave/", FunctionsSavePersonal),
]