from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import (Details, PersonalDetails, WorkDetails, StudentDetails, PlatformUsernameDetails, Project, Skill)
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
def FunctionsSaveProfile(request):
    user = request.user
    data = request.data

    details, _ = Details.objects.get_or_create(user=user)

    personal_data = data.get("personal")
    if personal_data:
        PersonalDetails.objects.update_or_create(
            details=details,
            defaults={
                "name": personal_data.get("name", ""),
                "contactmail": personal_data.get("contactmail", ""),
                "portfolio": personal_data.get("portfolio"),
                "country": personal_data.get("country", ""),
                "location": personal_data.get("location", ""),
            }
        )

    student_data = data.get("student")
    if student_data:
        StudentDetails.objects.update_or_create(
            details=details,
            defaults={
                "currentstatus": student_data.get("currentstatus", ""),
                "level": student_data.get("level", ""),
                "college": student_data.get("college", ""),
                "year": student_data.get("year"),
                "passingyear": student_data.get("passingyear"),
                "branch": student_data.get("branch", ""),
            }
        )

    work_data = data.get("work")
    if work_data:
        WorkDetails.objects.update_or_create(
            details=details,
            defaults={
                "workingprofile": work_data.get("workingprofile", ""),
                "preferredrole": work_data.get("preferredrole", ""),
                "yearexperience": int(work_data.get("yearexperience", 0)),
                "company": work_data.get("company", ""),
            }
        )

    projects_data = data.get("projects")
    if isinstance(projects_data, list):
        Project.objects.filter(details=details).delete()
        for proj in projects_data:
            if proj.get("name") and proj.get("description") and proj.get("link"):
                Project.objects.create(
                    details=details,
                    name=proj["name"],
                    description=proj["description"],
                    link=proj["link"]
                )

    skills_data = data.get("skills")
    if isinstance(skills_data, list):
        Skill.objects.filter(details=details).delete()
        for skill in skills_data:
            if isinstance(skill, str) and skill.strip():
                Skill.objects.create(details=details, skill=skill.strip())

    return JsonResponse({
        "success": True,
        "msg": "Profile saved / updated successfully"
    })

