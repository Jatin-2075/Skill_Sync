from django.db import models
import uuid
from django.contrib.auth.models import User


class DetailsTable(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20, unique=True)
    
    def __str__(self):
        return self.user.username

class PersonalTable(models.Model):
    connection = models.OneToOneField(DetailsTable, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    country = models.CharField(max_length=30)
    gender = models.CharField(max_length=10)
    bio = models.TextField(max_length=150)

    def __str__(self):
        return self.name

class SkillsTable(models.Model):
    connection = models.ForeignKey(DetailsTable, on_delete=models.CASCADE, related_name="skills")
    skill = models.CharField(max_length=30)

    def __str__(self):
        return self.skill

class UserNameTable(models.Model):
    connection = models.OneToOneField(DetailsTable, on_delete=models.CASCADE)
    git = models.CharField(max_length=50, unique=True)
    codeforces = models.CharField(max_length=50, unique=True)
    leetcode = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.git

class ProjectTable(models.Model):
    projectID = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    connection = models.ForeignKey(DetailsTable, on_delete=models.CASCADE, related_name="projects")
    projectname = models.CharField(max_length=30)
    projectdescription = models.TextField(max_length=300)
    projectgithub = models.URLField()
    projectdemo = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.projectname

class ProjectSkillsTable(models.Model):
    projectconnection = models.ForeignKey(ProjectTable, on_delete=models.CASCADE, related_name="skills")
    projectskill = models.CharField(max_length=20)

    def __str__(self):
        return self.projectskill

class ProjectProposalTable(models.Model):
    connection = models.ForeignKey(DetailsTable, on_delete=models.CASCADE)
    projectconnection = models.ForeignKey(ProjectTable, on_delete=models.CASCADE)
    proposal = models.TextField(max_length=100)

    def __str__(self):
        return f"{self.connection} proposal for {self.projectconnection}"

class EnrolledTable(models.Model):
    connection = models.ForeignKey(DetailsTable, on_delete=models.CASCADE)
    projectconnection = models.ForeignKey(ProjectTable, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.connection} -> {self.projectconnection}"