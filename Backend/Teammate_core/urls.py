from django.urls import path
from .views import (
    FunctionAddProject,
    FunctionSendProjects,
    FunctionProjectDetail,
)
urlpatterns = [
    path("addrecruitment/", FunctionAddProject),
    path("sendproject/", FunctionSendProjects),
    path("projectdetails/", FunctionProjectDetail),
]