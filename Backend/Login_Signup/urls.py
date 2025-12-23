from django.urls import path
from . import views

urls = [
    path('Signup/', views.Signup),
    path('Login/', views.Login),
    path('Logout/', views.Logout)
]