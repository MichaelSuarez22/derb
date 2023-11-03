from django.core.serializers import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import redirect


from .forms import ResponseForm
from .models import Question, Response, Formulario, Respuesta
from derbtable.Serializers import QuestionSerializer, ResponseSerializer, FormularioSerializer


def prueba(request):
    return render(request,"index.html")

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return redirect('/')  # Redirige a la vista 'ver_preguntas'
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    formset = [ResponseForm(initial={'question': pregunta}, pregunta=pregunta) for pregunta in preguntas]
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