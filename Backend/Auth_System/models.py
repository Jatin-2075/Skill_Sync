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
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    timezone = models.CharField(max_length=20)
    professionheading = models.CharField(max_length=100)
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
    github = models.CharField(max_length=100)
    codeforces = models.CharField(max_length=100)
    stackoverflow = models.CharField(max_length=100)

    def __str__(self):
        return self.github



class StudentDetails(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="student"
    )
    schoolname = models.CharField(max_length=100, editable=True)
    degree = models.CharField(max_length=100)
    fieldofstudy = models.CharField(max_length=100)
    startdate = models.CharField(max_length=10)
    enddate = models.CharField(max_length=100)
    currentlytheir = models.BooleanField(default=False)
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
