from django.core.serializers import json
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import redirect


from derbtable.forms import  ResponseNumberForm, ResponseTextForm
from .models import Question, Response, Formulario, Respuesta, Question2
from derbtable.Serializers import QuestionSerializer, ResponseSerializer, FormularioSerializer, Question2Serializer


def prueba(request):
    return render(request,"index.html")

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return(redirect("/"))
            return JsonResponse(serializer.data, status=201, safe=False)  # 201 Created
        return JsonResponse(serializer.errors, status=400, safe=False)


class Question2ViewSet(viewsets.ModelViewSet):
    queryset = Question2.objects.all()
    serializer_class = Question2Serializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return (redirect("/"))
            return JsonResponse(serializer.data, status=201, safe=False)  # 201 Created
        return JsonResponse(serializer.errors, status=400, safe=False)



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
                    response = form.save()
            return redirect('responder_preguntas')

    preguntas = Question.objects.all()
    formset = []
    respuestas = Response.objects.all()

    for pregunta in preguntas:
        # Filtra las preguntas por question_type
        if pregunta.question_type == "number":
            form = ResponseNumberForm(initial={'question': pregunta})
        else:
            form = ResponseTextForm(initial={'question': pregunta})
        formset.append(form)

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
        respuesta = Response.objects.get(id=respuesta_id)
        respuesta.delete()
        return JsonResponse({'message': 'Respuesta eliminada exitosamente'})
    except Response.DoesNotExist:
        return JsonResponse({'message': 'Respuesta no encontrada'}, status=404)

def guardar_respuesta(request):
    if request.method == 'POST':
        form = ResponseForm(request.POST)
        if form.is_valid():
            response = form.save()
            return JsonResponse({'success': True, 'response_id': response.id})
        else:
            return JsonResponse({'success': False, 'message': 'Error al guardar la respuesta'})
    return JsonResponse({'success': False, 'message': 'Solicitud no válida'})

def ver_preguntas(request):
    return render(request, 'Component_questions.html')



def responder_preguntas2(request):
    if request.method == 'POST':
        formset = ResponseForm(request.POST)
        if formset.is_valid():
            for form in formset:
                if form.cleaned_data.get('text_response'):
                    response = form.save()
            return redirect('responder_preguntas2')

    preguntas = Question2.objects.all()
    formset = []

    for pregunta in preguntas:
        # Filtra las preguntas por question_type
        if pregunta.question_type == "number":
            form = ResponseNumberForm(initial={'question': pregunta})
        else:
            form = ResponseTextForm(initial={'question': pregunta})
        formset.append(form)

    context = {
        'pregunta_formset': zip(formset, preguntas),  # Actualizado a 'pregunta_formset'
        'preguntas': preguntas,
    }

    return render(request, 'responder_preguntas2.html', context)




