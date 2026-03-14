from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path("storing/", include(Storing.urls)),
    path("community/", include(Community.urls)),
    path("getting/", include(Getting.urls))
]
