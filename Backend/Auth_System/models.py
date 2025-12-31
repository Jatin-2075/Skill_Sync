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
    contactmail = models.EmailField()
    portfolio = models.URLField()
    country = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class StudentDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="student"
    )
    currentstatus = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    college = models.CharField(max_length=200)
    year = models.PositiveIntegerField()
    passingyear = models.PositiveIntegerField()
    branch = models.CharField(max_length=100)

    def __str__(self):
        return self.currentstatus

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

class PlatformUsernameDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="platformusername"
    )
    github = models.CharField(max_length=100)
    codeforces = models.CharField(max_length=100)
    stackoverflow = models.CharField(max_length=100)

    def __str__(self):
        return self.github

class Project(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="projects"
    )
    name = models.CharField(max_length=100)
    description = models.TextField()
    link = models.URLField()

    def __str__(self):
        return self.name

class Skill(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="skills"
    )
    skill = models.CharField(max_length=100)

    def __str__(self):
        return self.skill
