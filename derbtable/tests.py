from multiprocessing.connection import Client

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from . import forms
from .forms import ResponseTextForm, ResponseNumberForm
from .models import Question, Response, Formulario, QuestionOption


#Probando el API

class QuestionAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.question_data = {'text': 'Test Question', 'question_type': 'text'}
        self.question = Question.objects.create(**self.question_data)
        self.url = reverse('question-list')

#Comprueba que se crea la pregunta
    def test_create_question(self):
        response = self.client.post(self.url, self.question_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#Comprueba que se obtiene la lista de preguntas
    def test_get_question_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
#Comprueba que se obtienen las preguntas haciendo un GET a la vista
    def test_get_question_detail(self):
        detail_url = reverse('question-detail', args=[self.question.id])
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ResponseAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.question = Question.objects.create(text='Test Question', question_type='text')  # Crea una pregunta válida
        self.response_data = {'text_response': 'Test Response',
                              'question': self.question.id}  # Utiliza el ID de la pregunta
        self.url = reverse('response-list')  # Reemplaza 'response-list' con el nombre de tu vista

#Comprueba si se puede crear una respuesta POST a la vista
    def test_create_response(self):
        response = self.client.post(self.url, self.response_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#Comprueba si obtiene una respuesta usando GET
    def test_get_response_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_response_detail(self):
        detail_url = reverse('response-detail', args=[self.response.id])  # Reemplaza 'response-detail' con el nombre de tu vista
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)






#Probando el forms.py


class ResponseNumberFormTest(TestCase):
    def test_valid_form(self):
        # Crea una pregunta
        question = Question.objects.create(text='¿Cuántos años tienes?', question_type='number')

        # Datos válidos para el formulario de número
        data = {'question': question.id, 'text_response': '25'}
        form = ResponseNumberForm(data=data)

        # Verifica que el formulario sea válido
        self.assertTrue(form.is_valid())

    def test_invalid_form(self):
        # Crea una pregunta
        question = Question.objects.create(text='¿Cuántos años tienes?', question_type='number')


        data = {'question': question.id, 'text_response': 'no es un número'}
        form = ResponseNumberForm(data=data)

        # Verifica que el formulario no sea válido
        self.assertFalse(form.is_valid())

class ResponseTextFormTest(TestCase):
    def test_valid_form(self):
        # Crea una pregunta
        question = Question.objects.create(text='¿Cuál es tu nombre?', question_type='text')

        # Datos válidos para el formulario de texto
        data = {'question': question.id, 'text_response': 'Juan'}
        form = ResponseTextForm(data=data)

        # Verifica que el formulario sea válido
        self.assertTrue(form.is_valid())

    def test_invalid_form(self):
        # Crea una pregunta
        question = Question.objects.create(text='¿Cuál es tu nombre?', question_type='text')

        # Datos inválidos para el formulario de texto (campo vacío)
        data = {'question': question.id, 'text_response': ''}
        form = ResponseTextForm(data=data)

        # Verifica que el formulario no sea válido
        self.assertFalse(form.is_valid())



#probando la vista del formulario responder_preguntas

class ResponderPreguntasViewTest(TestCase):
    def setUp(self):
        # Configuración común para las pruebas
        self.client = Client()

    def test_responder_preguntas_view(self):
        # Crea preguntas de prueba
        pregunta_number = Question.objects.create(question_type='number')
        pregunta_text = Question.objects.create(question_type='text')

        # Realiza una solicitud POST a la vista con datos de formulario simulados
        response = self.client.post(reverse('responder_preguntas'), {
            f'form-{pregunta_number.id}-text_response': '42',  # Simula una respuesta de número
            f'form-{pregunta_text.id}-text_response': 'Respuesta de texto',  # Simula una respuesta de texto
        })

        # Verifica que la respuesta sea una redirección (HTTP 302)
        self.assertEqual(response.status_code, 302)

        # Verifica que las respuestas se hayan guardado correctamente en la base de datos
        self.assertEqual(Response.objects.filter(text_response='42').count(), 1)
        self.assertEqual(Response.objects.filter(text_response='Respuesta de texto').count(), 1)

        # También puedes realizar otras verificaciones según la lógica específica de tu vista

    def test_responder_preguntas_view_get(self):
        # Realiza una solicitud GET a la vista
        response = self.client.get(reverse('responder_preguntas'))

        # Verifica que la respuesta sea un éxito (HTTP 200)
        self.assertEqual(response.status_code, 200)


