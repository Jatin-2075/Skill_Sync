from django.db import models

class ShowProjects(models.Model):
    details = models.ForeignKey(
        Details,
        on_delete=models.CASCADE,
        related_name="showproject"
    )
    projeccttitle = models.CharField(max_length=40)
    projectdescription = models.CharField(max_length=200)
    