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
    Name = models.CharField(max_length=100)
    PortfolioLink = models.URLField(blank=True, null=True)
    Country = models.CharField(max_length=100)
    Location = models.CharField(max_length=100)
    CurrentStatus = models.CharField(max_length=100)
    PreferredRole = models.CharField(max_length=100)

    def __str__(self):
        return self.Name


class WorkDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="professional"
    )
    YearExperience = models.PositiveIntegerField()
    WorkingProfile = models.CharField(max_length=100)
    Description = models.CharField(max_length=200)
    Company = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.WorkingProfile} years"


class StudentDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="student"
    )
    Status = models.CharField(max_length=100)
    Field = models.CharField(max_length=100)
    Subject = models.CharField(max_length=100)
    College = models.CharField(max_length=100)

    def __str__(self):
        return self.Status
