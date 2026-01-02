from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Details, PersonalDetails 
import json

@api_view(["POST"])
def FunctionSignup(request):

    data = request.data
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return JsonResponse({'success':False, 'msg':'some credentials didnt  reach backend'})

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
def FunctionsSavePersonal(request):
    user = request.user
    data = request.data

    details, _ = Details.objects.update_or_create(user=user)

    personal_data = request.data.get("personal")

    if not personal_data:
        return JsonResponse({"success":True, "msg":"data didn't reach backend"})
    obj,_= PersonalDetails.objects.update_or_create(
        details=details,
        defaults={
            "fullname": personal_data.get("fullname", ""),
            "username": personal_data.get("username", ""),
            "country": personal_data.get("country", ""),
            "city": personal_data.get("city"),
            "timezone": personal_data.get("timezone", ""),
            "headline" : personal_data.get("headline",""),
            "bio" : personal_data.get("bio",""),
            "visibility" : personal_data.get("visibility",""),
        }
    )
    return JsonResponse({
        "success" : True,
        "msg" : "profile create next page",
        "personal": {
            "fullname" : obj.fullname,
            "bio" : obj.bio,
    }})