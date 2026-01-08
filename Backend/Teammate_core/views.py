from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.response import Response

from Auth_System.models import (
    PersonalDetails,
    StudentDetails,
    ProjectDetails,
    PlatformUsernameDetails,
    Colaboration,
    UserSkill,
)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionShowProject(request):
    return None