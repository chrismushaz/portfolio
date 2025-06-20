from django.urls import path
from . import views
from .views import contact
from django.views.generic import TemplateView

urlpatterns = [
    path('', views.home, name='home'),
    path('contact/', views.contact, name='contact'),
    path('success/', TemplateView.as_view(template_name='success.html'), name='success'),
    
    
]