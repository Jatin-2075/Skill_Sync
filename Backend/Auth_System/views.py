from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Details, PersonalDetails, WorkDetails, StudentDetails
from .serializers import StudentDetailsSerializers, WorkingProfileSerializers, PersonalDetailsSerializers
import json

@api_view(["POST"])
def FunctionSignup(request):

    data = request.data
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return JsonResponse({'success':False, 'msg':'some credentials didnt reach backend'})

    if User.objects.filter(username=username).exists():
        return JsonResponse({'success': False, 'msg': 'Username Already Exists'})

    if User.objects.filter(email=email).exists():
        return JsonResponse({'success': False, 'msg': 'Email Already Exists'})

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    Details.objects.create(user=user)

    return JsonResponse({'success': True, 'msg': 'Account Created'})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionPersonalDetails(request):
    details, _= Details.objects.get_or_create(user=request.user)

    personal, _= PersonalDetails.objects.get_or_create(details=details)

    serializer = PersonalDetailsSerializers(
        personal,
        data = request.data
    )
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({
            "success" : True,
            "uuid" : str(details.uuid),
            "msg" : "done",
        },
            status = status.HTTP_200_OK,
        )

    return JsonResponse({"success":False, "msg":"details err occured"})