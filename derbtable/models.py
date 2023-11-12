from django.db import models

class Question(models.Model):
    text = models.CharField(max_length=255)
    question_type = models.CharField(max_length=20)
    descripcion = models.TextField(null=True, blank=True)
    condicion = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.text

class Question2(models.Model):
    text = models.CharField(max_length=255)
    question_type = models.CharField(max_length=20)
    descripcion = models.TextField(null=True, blank=True)
    condicion = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.text

class QuestionOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=100)

    def __str__(self):
        return self.text

class Response(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text_response = models.TextField(null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    condicion = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.text_response


    def __str__(self):
        return f"Response to {self.question.text}"



class Formulario(models.Model):
    name = models.CharField(max_length=255)
    questions = models.ManyToManyField(Question, related_name='formularios')

    def __str__(self):
        return self.name


class Respuesta(models.Model):
    respuesta_texto = models.CharField(max_length=255)