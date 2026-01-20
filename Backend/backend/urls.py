from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import ( 
    TokenObtainPairView, 
    TokenRefreshView
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh_pair"),
    
    path("auth/", include("Auth_System.urls")),

    path("/engine", include("Trust_Engine.urls")),

    path("/project", include("Teammate_core.urls")),
]
