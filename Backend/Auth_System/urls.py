from django.urls import path, include
from .views import FunctionSignup, FunctionsSaveProfile, Functionshowprofile

urlpatterns = [
    path("signup/", FunctionSignup),
    path("personalsave/", FunctionsSaveProfile),
    path("profile/", Functionshowprofile),
]