from django.urls import path
from .views import (
    FunctionShowProject
)
urlpatterns = [
    path("/showprojects",FunctionShowProject),
]