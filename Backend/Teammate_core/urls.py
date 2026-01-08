from django.urls import path
from .views import (
    FunctionAddProject
)
urlpatterns = [
    path("/showprojects",FunctionAddProject),
]