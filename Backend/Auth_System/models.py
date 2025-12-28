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
    contactemail = models.CharField(max_length=100)
    portfolioLink = models.URLField(blank=True, null=True)
    country = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    currentStatus = models.CharField(max_length=100)
    preferredRole = models.CharField(max_length=100)

    def __str__(self):
        return self.Name


class WorkDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="professional"
    )
    yearexperience = models.PositiveIntegerField()
    workingprofile = models.CharField(max_length=100)
    company = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.WorkingProfile} years"


class StudentDetails(models.Model):
    details = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="student"
    )
    level = models.CharField(max_length=100)
    field = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    college = models.CharField(max_length=100)

    def __str__(self):
        return self.Status


class PlatfromUsernameDetails(models.Model):
    detials = models.OneToOneField(
        Details,
        on_delete=models.CASCADE,
        related_name="username"
    )
    codeforces = models.CharField(max_length=100)
    github = models.CharField(max_length=100)
    stackoverflow = models.CharField(max_length=100)

    def __str__(self):
        return "DONE"