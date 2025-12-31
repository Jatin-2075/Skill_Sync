from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import (
    Details,
    PersonalDetails,
    WorkDetails,
    StudentDetails,
    PlatformUsernameDetails,
    Project,
    Skill,
)

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

    platform_data = data.get("platformusername")
    if platform_data:
        PlatformUsernameDetails.objects.update_or_create(
            details=details,
            defaults={
                "github": platform_data.get("github", ""),
                "codeforces": platform_data.get("codeforces", ""),
                "stackoverflow": platform_data.get("stackoverflow", ""),
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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Functionshowprofile(request):
    user = request.user

    # SAFE: prevents 500
    details, _ = Details.objects.get_or_create(user=user)

    response = {
        "personal": None,
        "student": None,
        "work": None,
        "platformusername": None,
        "skills": [],
        "projects": [],
    }

    # PERSONAL
    try:
        p = details.personal
        response["personal"] = {
            "name": p.name,
            "contactmail": p.contactmail,
            "portfolio": p.portfolio,
            "country": p.country,
            "location": p.location,
        }
    except:
        pass

    # STUDENT
    try:
        s = details.student
        response["student"] = {
            "currentstatus": s.currentstatus,
            "level": s.level,
            "college": s.college,
            "year": s.year,
            "passingyear": s.passingyear,
            "branch": s.branch,
        }
    except:
        pass

    # WORK (professional)
    try:
        w = details.professional
        response["work"] = {
            "workingprofile": w.workingprofile,
            "preferredrole": w.preferredrole,
            "yearexperience": w.yearexperience,
            "company": w.company,
        }
    except:
        pass

    # PLATFORM USERNAMES
    try:
        pu = details.platformusername
        response["platformusername"] = {
            "codeforces": pu.codeforces,
            "github": pu.github,
            "stackoverflow": pu.stackoverflow,
        }
    except:
        pass

    # SKILLS
    response["skills"] = list(
        Skill.objects.filter(details=details)
        .values_list("skill", flat=True)
    )

    # PROJECTS
    response["projects"] = list(
        Project.objects.filter(details=details)
        .values("name", "description", "link")
    )

    return JsonResponse(response)
