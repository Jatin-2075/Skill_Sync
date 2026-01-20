from django.urls import path
from .views import (
    FunctionAddProject,
    FunctionSendProjects,
)
urlpatterns = [
    path("addrecruitment/", FunctionAddProject),
    path("sendproject/", FunctionSendProjects),
]