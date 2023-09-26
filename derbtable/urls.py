from django.contrib import admin
from django.urls import path
from djgentelella.urls import urlpatterns as djgentelellaurls
from derbtable.views import prueba
from derbtable import views

urlpatterns = djgentelellaurls + [
    path('admin/', admin.site.urls),
path('', prueba, name='home'),
]
