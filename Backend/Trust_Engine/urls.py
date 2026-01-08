from django.urls import path, include
from .views import (
    FunctionSendPublicProfile
)

urlpatterns = [
    path("/publicprofileall", FunctionSendPublicProfile)
]