from django.urls import path, include
from .views import (
    FunctionSignup,
    FunctionSaveSkills,
    FunctionSendSkill,
    FunctionSavePersonal,
    FunctionSaveUsername,
    FunctionSaveProject,
    FunctionSaveColaboration,
    Functionprofilesend,
    FunctionStudentAPI,
)

urlpatterns = [
    path("signup/", FunctionSignup),
    path("personalsave/", FunctionSavePersonal),
    path("usernamesave/", FunctionSaveUsername),
    path("saveskills/", FunctionSaveSkills),
    path("sendskills/", FunctionSendSkill),
    path("projectsave/", FunctionSaveProject),
    path("studentapi/", FunctionStudentAPI),
    path("savecollaboration/", FunctionSaveColaboration),
]