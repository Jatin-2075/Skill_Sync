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
    fullname = models.CharField(max_length=100)
    username = models.CharField(max_length=40)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    timezone = models.CharField(max_length=20)
    headline = models.CharField(max_length=100)
    bio = models.CharField(max_length=100, editable=True)
    visibility = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class PlatformUsernameDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="platformusername"
    )
    gitusername = models.CharField(max_length=100)
    cfusername = models.CharField(max_length=100)
    stackusername = models.CharField(max_length=100)

    def __str__(self):
        return self.github



class StudentDetails(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="student"
    )
    number = models.PositiveIntegerField()
    schoolname = models.CharField(max_length=100, editable=True)
    degree = models.CharField(max_length=100)
    field = models.CharField(max_length=100)
    startdate = models.CharField(max_length=10)
    enddate = models.CharField(max_length=100)
    current = models.BooleanField(default=False)
    descritpion = models.CharField(max_length=100)

    def __str__(self):
        return self.currentstatus


class Project(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="projects"
    )
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20)
    description = models.TextField()
    githublink = models.URLField()
    livelink = models.URLField()

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
