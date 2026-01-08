from django.db import models
import uuid
from django.contrib.auth.models import User
from Auth_System.models import (
    PersonalDetails,
    StudentDetails,
    ProjectDetails,
    PlatformUsernameDetails,
    Colaboration,
    UserSkill,
    Details,
)

class UserLevel(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="level",
    )
    problemsolving = models.PositiveIntegerField()
    engineering = models.PositiveIntegerField()
    knowledge = models.PositiveIntegerField()
    consistency = models.PositiveIntegerField()
    impact = models.PositiveIntegerField()

    def __str__(self):
        return self.consistency


class UserPerformance(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="performance"
    )
    date = models.PositiveIntegerField()
    month = models.CharField(max_length=30)
    level = models.PositiveIntegerField()

    def __str__(self):
        return self.level

class UserSkillBalance(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="skillbalance"
    )
    skillname = models.CharField(max_length=40)
    skilllevel = models.PositiveIntegerField()