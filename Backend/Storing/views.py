from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import DetailsTable

from rest_framework import viewsets
from .models import *
from .serializers import *


@api_view(["POST"])
def FunctionSignup(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({'success': False, 'msg': 'Some credentials missing'})

    if User.objects.filter(username=username).exists():
        return Response({'success': False, 'msg': 'Username already exists'})

    if User.objects.filter(email=email).exists():
        return Response({'success': False, 'msg': 'Email already exists'})

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    DetailsTable.objects.create(
        user=user,
        username=username
    )

    return Response({'success': True, 'msg': 'Account Created'})


@api_view(["POST"])
def add_details(request):

    serializer = DetailsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "data": serializer.data})

    return Response({"success": False, "errors": serializer.errors})

@api_view(["GET"])
def get_details(request):

    details = DetailsTable.objects.all()
    serializer = DetailsSerializer(details, many=True)

    return Response({
        "success": True,
        "data": serializer.data
    })

@api_view(["POST"])
def add_personal(request):
    serializer = PersonalSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "data": serializer.data})

    return Response({"success": False, "errors": serializer.errors})

@api_view(["GET"])
def get_personal(request):
    data = PersonalTable.objects.all()
    serializer = PersonalSerializer(data, many=True)

    return Response({"success": True, "data": serializer.data})

@api_view(["POST"])
def add_skills(request):
    serializer = SkillsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "data": serializer.data})

    return Response({"success": False, "errors": serializer.errors})



@api_view(["GET"])
def get_skills(request):
    data = SkillsTable.objects.all()
    serializer = SkillsSerializer(data, many=True)

    return Response({"success": True, "data": serializer.data})


@api_view(["POST"])
def add_username(request):
    serializer = UserNameSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "data": serializer.data})

    return Response({"success": False, "errors": serializer.errors})


@api_view(["GET"])
def get_username(request):
    data = UserNameTable.objects.all()
    serializer = UserNameSerializer(data, many=True)

    return Response({"success": True, "data": serializer.data})

@api_view(["POST"])
def add_project(request):
    serializer = ProjectSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "data": serializer.data})

    return Response({"success": False, "errors": serializer.errors})


@api_view(["GET"])
def get_project(request):
    data = ProjectTable.objects.all()
    serializer = ProjectSerializer(data, many=True)

    return Response({"success": True, "data": serializer.data})


@api_view(["POST"])
def add_project_skills(request):
    serializer = ProjectSkillsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "data": serializer.data})

    return Response({"success": False, "errors": serializer.errors})

@api_view(["GET"])
def get_project_skills(request):
    data = ProjectSkillsTable.objects.all()
    serializer = ProjectSkillsSerializer(data, many=True)

    return Response({"success": True, "data": serializer.data})


@api_view(["POST"])
def add_enrolled(request):
    serializer = EnrolledSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True, "data": serializer.data})

    return Response({"success": False, "errors": serializer.errors})


@api_view(["GET"])
def get_enrolled(request):
    data = EnrolledTable.objects.all()
    serializer = EnrolledSerializer(data, many=True)

    return Response({"success": True, "data": serializer.data})

@api_view(["DELETE"])
def delete_details(request, id):
    try:
        data = DetailsTable.objects.get(id=id)
        data.delete()
        return Response({"success": True, "msg": "Details deleted"})
    except DetailsTable.DoesNotExist:
        return Response({"success": False, "msg": "Details not found"})

@api_view(["DELETE"])
def delete_personal(request, id):
    try:
        data = PersonalTable.objects.get(id=id)
        data.delete()
        return Response({"success": True, "msg": "Personal deleted"})
    except PersonalTable.DoesNotExist:
        return Response({"success": False, "msg": "Personal not found"})

@api_view(["DELETE"])
def delete_skills(request, id):
    try:
        data = SkillsTable.objects.get(id=id)
        data.delete()
        return Response({"success": True, "msg": "Skill deleted"})
    except SkillsTable.DoesNotExist:
        return Response({"success": False, "msg": "Skill not found"})

@api_view(["DELETE"])
def delete_username(request, id):
    try:
        data = UserNameTable.objects.get(id=id)
        data.delete()
        return Response({"success": True, "msg": "Username deleted"})
    except UserNameTable.DoesNotExist:
        return Response({"success": False, "msg": "Username not found"})


@api_view(["DELETE"])
def delete_project(request, id):
    try:
        data = ProjectTable.objects.get(id=id)
        data.delete()
        return Response({"success": True, "msg": "Project deleted"})
    except ProjectTable.DoesNotExist:
        return Response({"success": False, "msg": "Project not found"})

@api_view(["DELETE"])
def delete_project_skills(request, id):
    try:
        data = ProjectSkillsTable.objects.get(id=id)
        data.delete()
        return Response({"success": True, "msg": "Project skill deleted"})
    except ProjectSkillsTable.DoesNotExist:
        return Response({"success": False, "msg": "Project skill not found"})


@api_view(["DELETE"])
def delete_enrolled(request, id):
    try:
        data = EnrolledTable.objects.get(id=id)
        data.delete()
        return Response({"success": True, "msg": "Enrollment deleted"})
    except EnrolledTable.DoesNotExist:
        return Response({"success": False, "msg": "Enrollment not found"})
