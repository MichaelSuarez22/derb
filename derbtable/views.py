from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def prueba(request):
    return render(request,"index.html")