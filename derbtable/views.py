from django.core.serializers import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets

from .forms import ResponseForm
from .models import Question, Response, Formulario, Respuesta
from derbtable.Serializers import QuestionSerializer, ResponseSerializer, FormularioSerializer


def prueba(request):
    return render(request,"index.html")

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer



#Para mostrar el formulario

def responder_preguntas(request):
    if request.method == 'POST':
        formset = ResponseForm(request.POST)
        if formset.is_valid():
            for form in formset:
                if form.cleaned_data.get('text_response'):
                    response = form.save(commit=False)
                    response.save()
            return redirect('responder_preguntas')

    preguntas = Question.objects.all()
    formset = [ResponseForm(initial={'question': pregunta}) for pregunta in preguntas]

    respuestas = Response.objects.all()

    context = {
        'formset_with_questions': zip(formset, preguntas),
        'preguntas': preguntas,
        'respuestas': respuestas,
    }

    return render(request, 'responder_preguntas.html', context)

def derb_view(request):
    return render(request, 'derb.html')


class FormularioViewSet(viewsets.ModelViewSet):
    queryset = Formulario.objects.all()
    serializer_class = FormularioSerializer


def eliminar_respuesta(request, respuesta_id):
    try:
        respuesta = Respuesta.objects.get(id=respuesta_id)
        respuesta.delete()
        return redirect('responder_preguntas')  # Redirige a la vista "responder_preguntas" después de la eliminación
    except Respuesta.DoesNotExist:
        return redirect('responder_preguntas')
