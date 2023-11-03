from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

from . import forms
from .forms import ResponseForm
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


#Pruebas para el responseForm(forms.py)


class ResponseFormTest(TestCase):
    def setUp(self):
        self.multiple_choice_question = Question.objects.create(text="Multiple Choice Question", question_type="multiple_choice")
        self.text_question = Question.objects.create(text="Text Question", question_type="text")

        self.option1 = QuestionOption.objects.create(question=self.multiple_choice_question, text="Option 1")
        self.option2 = QuestionOption.objects.create(question=self.multiple_choice_question, text="Option 2")

    def test_form_fields_for_multiple_choice_question(self):
        form = ResponseForm(self.multiple_choice_question)  # Pasa la pregunta directamente

        self.assertTrue('text_response' in form.fields)
        self.assertIsInstance(form.fields['text_response'], forms.ModelMultipleChoiceField)
        self.assertEqual(form.fields['text_response'].queryset.count(), 2)

    def test_form_fields_for_text_question(self):
        form = ResponseForm()
        form.set_question(self.text_question)

        self.assertTrue('text_response' in form.fields)
        self.assertIsInstance(form.fields['text_response'], forms.CharField)
        self.assertEqual(form.fields['text_response'].max_length, 200)