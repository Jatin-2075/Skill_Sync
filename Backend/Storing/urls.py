from django.urls import path
from .views import *

urlpatterns = [

    path("add_details/", add_details),
    path("get_details/", get_details),

    path("add_personal/", add_personal),
    path("get_personal/", get_personal),

    path("add_skills/", add_skills),
    path("get_skills/", get_skills),

    path("add_username/", add_username),
    path("get_username/", get_username),

    path("add_project/", add_project),
    path("get_project/", get_project),

    path("add_project-skills/", add_project_skills),
    path("get_project-skills/", get_project_skills),

    path("add_enrolled/", add_enrolled),
    path("get_enrolled/", get_enrolled),
    

    
    path("delete-details/<int:id>/", delete_details),

    path("delete-personal/<int:id>/", delete_personal),

    path("delete-skills/<int:id>/", delete_skills),

    path("delete-username/<int:id>/", delete_username),

    path("delete-project/<int:id>/", delete_project),

    path("delete-project-skills/<int:id>/", delete_project_skills),

    path("delete-enrolled/<int:id>/", delete_enrolled),


]