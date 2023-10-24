from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from djgentelella.urls import urlpatterns as djgentelellaurls
from derbtable.views import prueba
from derbtable import views

def home(request):
    return HttpResponse('OK')

urlpatterns = djgentelellaurls + [
    path('admin/', admin.site.urls),
path('', prueba, name='home'),
]
