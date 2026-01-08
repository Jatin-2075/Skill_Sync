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
    Details,
)

from .models import (
    PostProject,
    TechStack,
    Roadmap,
    TeamMember,
)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionAddProject(request):
    user = request.user
    details = Details.objects.get(user=request.user)
    return None
