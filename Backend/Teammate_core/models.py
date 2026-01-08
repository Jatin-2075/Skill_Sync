from django.db import models
import uuid

from Auth_System.models import (
    SkillList,
    Details,
)

class PostProject(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="PostProject"
    )

    projectid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    
    projecttitle = models.CharField(max_length=20)
    projectsummary = models.CharField(max_length=100)
    projectdescription = models.CharField(max_length=500)
    projectvisibility = models.CharField(max_length=20)
    projectcategory = models.CharField(max_length=30)
    desiredteammember = models.PositiveIntegerField()
    ratingrequired = models.PositiveIntegerField()
    currentteammember = models.PositiveIntegerField()

    def __str__(self):
        return self.projecttitle


class TechStack(models.Model):
    project = models.ForeignKey( PostProject, on_delete=models.CASCADE, related_name="techstack")
    skill = models.ForeignKey(SkillList,on_delete=models.CASCADE,related_name="projects")
    def __str__(self):
        return f"{self.project} - {self.skill}"


class Roadmap(models.Model):
    project = models.ForeignKey(
        PostProject,
        on_delete=models.CASCADE,
        related_name="roadmap"
    )
    task = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task


class TeamMember(models.Model):
    project = models.ForeignKey( PostProject, on_delete=models.CASCADE)
    profile = models.ForeignKey( Details, on_delete=models.CASCADE)
    membernumber = models.PositiveIntegerField()

    def __str__(self):
        return str(self.profile)
