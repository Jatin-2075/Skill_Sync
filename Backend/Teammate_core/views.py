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

from .models import PostProject, ProjectNarrative, Team, TechStack, Deliverables, CollaborationSettings
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def FunctionAddProject(request):
    user = request.user
    details = Details.objects.get(user=user)
    data = request.data

    post_data = data["post_project"]
    narrative_data = data["narrative"]
    team_data = data["team"]
    collab_data = data["collaboration"]
    techstack_data = data["techstack"]
    deliverables_data = data["deliverables"]

    project = PostProject.objects.create(
        details=details,
        project_title=post_data.get("projecttitle"),
        project_summary=post_data.get("projectsummary"),
        project_visibility=post_data.get("projectvisibility"),
        project_category=post_data.get("projectcategory"),
    )

    ProjectNarrative.objects.create(
        project=project,
        problem_statement=narrative_data.get("problemstatement"),
        problem_solution=narrative_data.get("problemsolution"),
        repo_link=narrative_data.get("repolink"),
    )

    Team.objects.create(
        project=project,
        desired_member_number=team_data.get("desired_member_number"),
        min_rating=team_data.get("min_rating"),
    )

    CollaborationSettings.objects.create(
        project=project,
        expected_commitment=collab_data.get("expected_commitment"),
        collaboration_style=collab_data.get("collaboration_style"),
        communication_norms=collab_data.get("communication_norms"),
    )

    for item in techstack_data:
        skill, _ = SkillList.objects.get_or_create(skill=item["skill"])
        TechStack.objects.create(project=project, skill=skill)

    for i, d in enumerate(deliverables_data, start=1):
        Deliverables.objects.create(
            project=project,
            deliverable_id=i,
            deliverable_name=d["deliverablename"],
            completed=False,
        )

    return JsonResponse({"success": True, "msg": "Project created"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FunctionSendProjects(request):
    projects = PostProject.objects.select_related("details").all().order_by("-created_at")

    data = []
    for p in projects:
        data.append({
            "id": str(p.projectid),
            "title": p.project_title,
            "summary": p.project_summary,
            "visibility": p.project_visibility,
            "category": p.project_category,
            "creator": p.details.user.username,
            "created_at": p.created_at,
        })

    return JsonResponse({
        "success": True,
        "projects": data
    })


