from django.urls import path
from . import views

urls = [
    path('Profile/', views.profile_making ),
    path('Skills/', views.skills_save),
    path('Experience/', views.experience_save),
]