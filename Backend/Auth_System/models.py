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
    fullName = models.CharField(max_length=100)
    username = models.CharField(max_length=40)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    gender = models.CharField(max_length=20)
    headline = models.CharField(max_length=100)
    bio = models.CharField(max_length=100, editable=True)
    visibility = models.CharField(max_length=20)

    def __str__(self):
        return self.fullName


class SkillList(models.Model):
    skill = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.skill

class UserSkill(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="user_skills"
    )
    skill = models.ForeignKey(
        SkillList,
        on_delete=models.CASCADE,
        related_name="users"
    )

    class Meta:
        unique_together = ("details", "skill")


class PlatformUsernameDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="platformusername"
    )
    cfusername = models.CharField(max_length=100)
    gitusername = models.CharField(max_length=100)
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

    schoolname = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )

    degree = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )

    field = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    startdate = models.CharField(
        max_length=10,
        blank=False,
        null=False
    )

    enddate = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    current = models.BooleanField(
        default=False
    )

    description = models.TextField(
        blank=True,
        null=True
    )


    def __str__(self):
        return f"{self.schoolname} - {self.degree}"


class ProjectDetails(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="projects"
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20)
    description = models.TextField()
    githublink = models.URLField()
    livelink = models.URLField()

    def __str__(self):
        return self.name


class Colaboration(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="colab"
    )
    opensource = models.BooleanField(default=False),
    paidprojects = models.BooleanField(default=False),
    startup = models.BooleanField(default=False),
    mentorship = models.BooleanField(default=False),

    def __str__(self):
        return self.opensource