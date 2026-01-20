from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.response import Response

from Auth_System.models import (
    PersonalDetails,
    StudentDetails,
    UserProjectDetails,
    PlatformUsernameDetails,
    Colaboration,
    UserSkill,
)


# @api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
# def Trust_Level:





@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def FunctionSendPublicProfile(request):
    obj, _= PersonalDetails.objects.get()
    return None