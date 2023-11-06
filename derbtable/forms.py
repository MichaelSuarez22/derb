from django import forms
from .models import Response


# class ResponseForm(forms.ModelForm):
#     class Meta:
#         model = Response
#         fields = ['question', 'text_response']
#
#     def __init__(self, *args, **kwargs):
#         pregunta_actual = kwargs.pop('pregunta', None)
#         super().__init__(*args, **kwargs)
#
#         if pregunta_actual:
#             if pregunta_actual.text == "Cuánto fue el tiempo demorado ?":
#                 # Para la pregunta #2, establece el campo de tipo number
#                 self.fields['text_response'] = forms.IntegerField(
#                     widget=forms.NumberInput(attrs={'type': 'number', 'step': '1'}),
#                 )
#             else:
#                 # Para otras preguntas, usa un campo de texto
#                 self.fields['text_response'] = forms.CharField(max_length=200, widget=forms.TextInput())
#
#
#         self.fields['question'].widget = forms.HiddenInput()


class ResponseNumberForm(forms.ModelForm):
    class Meta:
        model = Response
        fields = ['question', 'text_response']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['text_response'].widget = forms.NumberInput(attrs={'type': 'number', 'step': '1'})

class ResponseTextForm(forms.ModelForm):
    class Meta:
        model = Response
        fields = ['question', 'text_response']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['text_response'].widget = forms.TextInput()