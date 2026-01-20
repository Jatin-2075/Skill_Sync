from django.db import models
import uuid

from Auth_System.models import Details, SkillList


class PostProject(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
    )

    projectid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    project_title = models.CharField(max_length=50)
    project_summary = models.CharField(max_length=200)
    project_visibility = models.CharField(max_length=20)
    project_category = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.projecttitle


class ProjectNarrative(models.Model):
    project = models.OneToOneField(
        PostProject,
        on_delete=models.CASCADE,
    )

    problem_statement = models.TextField()
    problem_solution = models.TextField()
    repo_link = models.URLField()


class ProjectDuration(models.Model):
    project = models.ForeignKey(
        PostProject,
        on_delete=models.CASCADE,
    )
    start_date = models.CharField()
    time_zone_preferred = models.CharField()
    end_date = models.CharField()

class Deliverables(models.Model):
    project = models.ForeignKey(
        PostProject,
        on_delete=models.CASCADE,
    )
    deliverable_id = models.PositiveIntegerField()
    deliverable_name = models.CharField(max_length=100)
    completed = models.BooleanField()


class TechStack(models.Model):
    project = models.ForeignKey(
        PostProject,
        on_delete=models.CASCADE,
    )
    skill = models.ForeignKey(SkillList, on_delete=models.CASCADE)


class Team(models.Model):
    project = models.OneToOneField(
        PostProject,
        on_delete=models.CASCADE,
    )

    desired_member_number = models.PositiveIntegerField()
    min_rating = models.PositiveIntegerField(default=0)


class CollaborationSettings(models.Model):
    project = models.OneToOneField(
        PostProject,
        on_delete=models.CASCADE,
    )
    expected_commitment = models.CharField( max_length=30, choices=[ ("part-time", "Part-time (10-20 hrs/week)"), ("full-time", "Full-time (30+ hrs/week)"),])
    collaboration_style = models.CharField( max_length=20, choices=[ ("async", "Async First"), ("sync", "Synchronous"), ])
    communication_norms = models.TextField(blank=True)
