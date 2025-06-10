from django.shortcuts import render
from django.contrib import messages
from Base import models
from django.http import JsonResponse

def home(request):
    return render(request, 'home.html')


def contact(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        message = request.POST.get('message')

        # Validation
        if len(name) <= 1 or len(name) >= 30:
            return JsonResponse({'status': 'error', 'message': 'Name should be greater than 2 and less than 30 characters.'})
        if len(email) <= 1 or len(email) >= 30:
            return JsonResponse({'status': 'error', 'message': 'Invalid email, try again.'})
        if len(phone) <= 9 or len(phone) >= 13:
            return JsonResponse({'status': 'error', 'message': 'Invalid phone number. It should be 10 to 12 digits.'})

        # Save the data to the database
        ins = models.Contact(name=name, email=email, message=message, phone=phone)
        ins.save()

        return JsonResponse({'status': 'success', 'message': 'Thank you for contacting me! Your message has been saved.'})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method. Only POST is allowed.'}, status=400)
