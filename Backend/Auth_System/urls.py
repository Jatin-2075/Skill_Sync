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

    FunctionSendStudent,
)

urlpatterns = [
    path("signup/", FunctionSignup),
    path("personalsave/", FunctionSavePersonal),
    path("usernamesave/", FunctionSaveUsername),
    path("saveskills/", FunctionSaveSkills),
    path("sendskills/", FunctionSendSkill),
    path("projectsave/", FunctionSaveProject),
    path("colaboration/", FunctionSaveColaboration),
    path("studentsave/", FunctionSaveStudent),

    path("sendstudent/", FunctionSendStudent),
]