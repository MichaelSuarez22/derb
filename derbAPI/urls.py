
from django.contrib import admin
from django.urls import path, include

from derbtable import views

urlpatterns = [
    path('admin/', admin.site.urls),
path('',include('derbtable.urls'))
]
