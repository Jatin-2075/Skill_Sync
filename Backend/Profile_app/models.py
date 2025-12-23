from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=100, blank=False)
    dob = models.CharField(max_length=100, blank=True)
    about = models.TextField(blank=True)
    photo = models.ImageField(upload_to="photos/", blank=True, null=True)

    def __str__(self):
        return self.user.username


class Skill(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="skills")
    skill = models.CharField(max_length=100)

    def __str__(self):
        return self.skill


class Experience(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="experiences" )
    company = models.CharField(max_length=100)
    job_title = models.CharField(max_length=40)
    months = models.CharField(max_length=5)

    def __str__(self):
        return self.job_title
