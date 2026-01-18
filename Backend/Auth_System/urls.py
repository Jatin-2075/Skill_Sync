from django.urls import path, include
from .views import (
    FunctionSignup,
    FunctionSaveSkills,
    FunctionSendSkill,
    FunctionSavePersonal,
    FunctionSaveUsername,
    FunctionSaveStudent,
    FunctionSaveProject,
    FunctionSaveColaboration,
    Functionprofilesend,
    FunctionSendStudent,
    FunctionDeleteStudent,
)

urlpatterns = [
    path("signup/", FunctionSignup),
    path("personalsave/", FunctionSavePersonal),
    path("usernamesave/", FunctionSaveUsername),
    path("saveskills/", FunctionSaveSkills),
    path("sendskills/", FunctionSendSkill),
    path("projectsave/", FunctionSaveProject),
    path("savecollaboration/", FunctionSaveColaboration),
    path("studentsave/", FunctionSaveStudent),
    path("profilesend/", Functionprofilesend),
    path("sendstudent/", FunctionSendStudent),

    path("deletestudent/", FunctionDeleteStudent),
]