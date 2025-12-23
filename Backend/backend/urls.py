
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('Login_Signup.urls')),
    path('', include('Profile_app.urls'))
]
