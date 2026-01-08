from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import (
    Details,
    PersonalDetails,
    SkillList,
    UserSkill,
    PlatformUsernameDetails,
    StudentDetails,
    ProjectDetails,
    ProjectSkills,
    Colaboration,
)
import json
from rest_framework.response import Response


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
def FunctionSaveSkills(request):
    skills = request.data.get("skills", [])

    if not skills:
        return JsonResponse(
            {"success": False, "msg": "No skills provided"},
            status=400
        )

    details = Details.objects.get(user=request.user)

    for skill_name in skills:
        skill, _ = SkillList.objects.get_or_create(skill=skill_name.strip())

        UserSkill.objects.get_or_create(
            details=details,
            skill=skill
        )

    return JsonResponse({"success": True})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def FunctionSendSkill(request):
    skills = SkillList.objects.all().order_by("skill")

    return JsonResponse({
        "success": True,
        "skills": [s.skill for s in skills]
    })

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionSavePersonal(request):
    user = request.user
    data = request.data

    details= Details.objects.get(user=user)

    personal_data = request.data.get("personal")

    if not personal_data:
        return JsonResponse({"success":True, "msg":"data didn't reach backend"})
    obj,_= PersonalDetails.objects.update_or_create(
        details=details,
        defaults={
            "fullName": personal_data.get("fullName", ""),
            "username": personal_data.get("username", ""),
            "country": personal_data.get("country", ""),
            "city": personal_data.get("city"),
            "gender": personal_data.get("gender", ""),
            "headline" : personal_data.get("headline",""),
            "bio" : personal_data.get("bio",""),
            "visibility" : personal_data.get("visibility",""),
        }
    )


    return JsonResponse({
        "success" : True,
        "msg" : "profile create next page",
         "personal": {
            "fullName": obj.fullName,
            "username": obj.username,
            "country": obj.country,
            "city": obj.city,
            "gender": obj.gender,
            "headline": obj.headline,
            "bio": obj.bio,
            "visibility": obj.visibility,
        }})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Functionprofilesend(request):
    user = request.user
    details = Details.objects.get(user=user)

    try :
        obj = PersonalDetails.objects.get(details=details)

        return JsonResponse({"success" : True, "msg" : "done" , "data" : {
            "visibility" : obj.visibility,
        }})
    except:
        return JsonResponse({"success" : False, "msg" : "profile not don"})



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionSaveUsername(request):
    user = request.user
    data = request.data

    details, created = Details.objects.get_or_create(user=user)

    usernames_data = data.get("usernames")

    if not usernames_data:
        return JsonResponse({"success": False, "msg": "No username data received"}, status=400)

    try:
        obj, _ = PlatformUsernameDetails.objects.update_or_create(
            details=details,
            defaults={
                "cfusername": usernames_data.get("cfusername", ""),
                "stackusername": usernames_data.get("stackusername", ""),
                "gitusername": usernames_data.get("gitusername", ""),
            }
        )

        return JsonResponse({
            "success": True, 
            "msg": "Usernames saved successfully", 
            "data": {
                "cfusername": obj.cfusername,
                "stackusername": obj.stackusername, 
                "gitusername": obj.gitusername,
            }
        })

    except Exception as e:
        return JsonResponse({"success": False, "msg": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionSaveStudent(request):
    user = request.user
    item = request.data

    print(item)

    details = Details.objects.filter(user=user).first()
    if not item or not details:
        return JsonResponse(
            {"success": False, "msg": "Data didn't reach us"},
            status=400
        )

    last_entry = (
        StudentDetails.objects
        .filter(details=details)
        .order_by("-number")
        .first()
    )

    number_wehave = last_entry.number + 1 if last_entry else 1
    print(number_wehave)

    if number_wehave > 4:
        return JsonResponse(
            {"success": False, "msg": "limit reached"},
        )
    try:
        StudentDetails.objects.create(
            details=details,
            number=number_wehave,                      
            schoolname=item.get("schoolname"),
            degree=item.get("degree"),
            field=item.get("field"),
            startdate=item.get("startdate") or None,
            enddate=item.get("enddate") or None,
            current=item.get("current", False),
            description=item.get("description", ""),
        )

        return JsonResponse({
            "success": True,
            "msg": "Education history updated successfully"
        })

    except Exception as e:
        print(f"Error saving education: {str(e)}")
        return JsonResponse(
            {
                "success": False,
                "msg": "A database error occurred",
                "error": str(e)
            },
        )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def FunctionDeleteStudent(request):
    user = request.user
    details = Details.objects.get(user=user)
    data = request.data
    number = data.get("number")

    if number is None:
        return JsonResponse({"success": False, "msg": "No number provided"}, status=400)

    try:
        student = StudentDetails.objects.get(details=details, number=number)
        student.delete()
        return JsonResponse({"success": True, "msg": "Done"})

    except StudentDetails.DoesNotExist:
        return JsonResponse({"success": False, "msg": "Not found"}, status=404)

    except Exception:
        return JsonResponse({"success": False, "msg": "not Done"}, status=500)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def FunctionSendStudent(request):
    user = request.user

    details = Details.objects.filter(user=user).first()
    if not details:
        return JsonResponse({
            "success": False,
            "msg": "User details not found",
            "data": []
        }, status=404)

    education = (
        StudentDetails.objects
        .filter(details=details)
        .order_by("-number")
    )

    data = []
    for ed in education:
        data.append({
            "number": ed.number,
            "schoolname": ed.schoolname,
            "degree": ed.degree,
            "field": ed.field,
            "startdate": str(ed.startdate) if ed.startdate else None,
            "enddate": str(ed.enddate) if ed.enddate else None,
            "current": ed.current,
            "description": ed.description,
        })

    return JsonResponse({
        "success": True,
        "msg": "Education timeline fetched",
        "data": data
    })


@api_view(["POST", "GET", "DELETE"])
@permission_classes([IsAuthenticated])
def FunctionSaveProject(request):
    user = request.user

    try:
        details = Details.objects.get(user=user)
    except Details.DoesNotExist:
        return JsonResponse({"success": False, "msg": "User details not found"}, status=404)

    if request.method == "GET":
        projects = ProjectDetails.objects.filter(details=details)
        project_list = []
        for proj in projects:
            skills = [ps.skill.skill for ps in proj.project_skills.all()]
            project_list.append({
                "id": str(proj.id),
                "title": proj.name,
                "role": proj.role,
                "description": proj.description,
                "skills": skills,
                "repositoryUrl": proj.githublink,
                "demoUrl": proj.livelink,
            })
        return JsonResponse({"success": True, "data": project_list})

    elif request.method == "POST":
        payload = request.data.get("projects", [])

        if not payload:
            return JsonResponse({"success": False, "msg": "No project data received"}, status=400)

        for proj in payload:
            project_obj = ProjectDetails.objects.create(
                details=details,
                name=proj.get("name"),
                role=proj.get("role"),
                description=proj.get("description"),
                githublink=proj.get("githublink"),
                livelink=proj.get("livelink"),
            )

            skills = proj.get("skills", [])
            for skill_name in skills:
                skill, _ = SkillList.objects.get_or_create(skill=skill_name.strip())
                ProjectSkill.objects.get_or_create(project=project_obj, skill=skill)

        return JsonResponse({"success": True, "msg": "Projects saved"})

    elif request.method == "DELETE":
        project_id = request.data.get("id")
        if not project_id:
            return JsonResponse({"success": False, "msg": "No project id provided"}, status=400)
        try:
            proj = ProjectDetails.objects.get(id=project_id, details=details)
            proj.delete()
            return JsonResponse({"success": True, "msg": "Project deleted"})
        except ProjectDetails.DoesNotExist:
            return JsonResponse({"success": False, "msg": "Project not found"}, status=404)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionSaveColaboration(request):
    user = request.user
    data = request.data.get("colab")

    if not data:
        return JsonResponse({"success": False, "msg": "no data recieved"}, status=400)

    details = Details.objects.get(user=user)

    obj, _ = Colaboration.objects.get_or_create(
        details=details,
        defaults={
            "opensource": bool(data.get("opensource", False)),
            "paidprojects": bool(data.get("paidprojects", False)),
            "startup": bool(data.get("startup", False)),
            "mentorship": bool(data.get("mentorship", False)),
        }
    )

    return JsonResponse({
        "success": True,
        "msg": "done",
        "data": {
            "opensource": obj.opensource,
            "paidprojects": obj.paidprojects,
            "startup": obj.startup,
            "mentorship": obj.mentorship,
        }
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def FunctionColaboration(request):
    user = request.user
    details = Details.objects.filter(user=user).first()
    if not details:
        return JsonResponse({"success": False, "msg": "User details not found"}, status=404)

    obj = Colaboration.objects.filter(details=details).first()
    data = {
        "opensource": False,
        "paidprojects": False,
        "startup": False,
        "mentorship": False,
    }

    if obj:
        data = {
            "opensource": obj.opensource,
            "paidprojects": obj.paidprojects,
            "startup": obj.startup,
            "mentorship": obj.mentorship,
        }

    return JsonResponse({"success": True, "data": data})

