from .models import Profile
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout

def Signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(username=username).exists():
            return JsonResponse({'success' : False, 'msg' : 'username already present'})
 
        if User.objects.filter(email=email).exists():
            return JsonResponse({ 'success' : False ,'msg':'Error Email Already Present'})

        my_user = User.objects.create_user(username=username ,email=email, password=password)
        Profile.objects.create(user=my_user)

        return JsonResponse({'success' : True, 'msg' : 'Account Created'})

    return JsonResponse({ 'success' : False ,'msg' : 'Error try again'})


def Login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'success' : True, 'msg' : 'logged in'})
        
        else:
            return JsonResponse({'success' : False, 'msg' : 'Somethings wrong check please'})

    else: 
        return JsonResponse ({'msg' : 'Try Again', 'success' : False})

    return JsonResponse({'success' : False, 'msg' : 'Error occurred'})


def Logout(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse ({'msg' : 'Success', 'success' : True})

    return JsonResponse({'success' : False , 'msg' : 'Some Error Occurred'})