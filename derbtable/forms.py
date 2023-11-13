from django import forms
from .models import Response





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


