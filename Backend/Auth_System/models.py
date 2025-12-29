from django.db import models
import uuid
from django.contrib.auth.models import User


class Details(models.Model): 
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class PersonalDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="personal"
    )
    name = models.CharField(max_length=100)
    contactmail = models.CharField(max_length=100)
    portfolio = models.URLField(blank=True, null=True)
    country = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class WorkDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="professional"
    )
    workingprofile = models.CharField(max_length=100)
    preferredrole = models.CharField(max_length=100)
    yearexperience = models.PositiveIntegerField()
    company = models.CharField(max_length=100)

    def __str__(self):
        return self.preferredrole


class StudentDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="student"
    )
    currentstatus = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    year = models.IntegerField(null=True)
    passingyear = models.IntegerField(null=True)
    branch = models.CharField(max_length=100)
    
    def __str__(self):
        return self.currentstatus


class PlatformUsernameDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="username"
    )
    codeforces = models.CharField(max_length=100)
    github = models.CharField(max_length=100)
    stackoverflow = models.CharField(max_length=100)

    def __str__(self):
        return "DONE"


class Project(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="projects"
    )
    name = models.CharField(max_length=100)
    link = models.URLField(max_length=100)
    describtion = models.CharField(max_length=150)

    def __str__(self):
        return "DONE"

class Skill(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="skills"
    )
    skills = models.CharField(max_length=100)

    def __str__(self):
        return "DONE"