from django.http import JsonResponse
from .models import Profile, Skill, Experience
from django.contrib.auth.models import User

def profile_making(request):
    if request.method == "POST":
        firstname = request.POST.get("name")
        photo = request.FILES.get("photo")
        about = request.POST.get("about")
        dob = request.POST.get("dob")

        profile, created = Profile.objects.get_or_create(user=request.user)

        if photo:
            profile.photo = photo

        profile.firstname = firstname
        profile.about = about
        profile.dob = dob
        profile.save()

        return JsonResponse({"success": True, "msg": "Done"})
    return JsonResponse({'Success' : False, 'msg':'Someerror Occurred'})


def skills_save(request):
    if request.method == "POST":
        skill_txt = request.POST.get("skill")

        profile = Profile.objects.get(user=request.user)

        Skill.objects.create(
            profile=profile,
            skill=skill_txt
        )

        return JsonResponse({"success": True, "msg": "Skill added"})

    return JsonResponse({})


def experience_save(request):
    if request.method == 'POST':    
        user = request.POST.get(user=request.user)
        company = request.POST.get('company')
        months = request.POST.get('months')
        job_title = request.POST.get('job_title')

        Expereince.objects.create(
            job_title = job_title,
            months = months,
            company = company
        )

        return JsonResponse({'success' : True , 'msg' : 'done'})
    return JsonResponse({})