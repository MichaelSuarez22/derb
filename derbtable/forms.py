from django import forms
from .models import Response


class ResponseForm(forms.ModelForm):
    class Meta:
        model = Response
        fields = ['question', 'text_response']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        pregunta_actual = self.fields['question'].queryset.first()

        if pregunta_actual.question_type == "multiple_choice":
            opciones = pregunta_actual.question.questionoption_set.all()
            self.fields['text_response'] = forms.ModelMultipleChoiceField(
                queryset=opciones,
                widget=forms.CheckboxSelectMultiple()
            )
        else:
            self.fields['text_response'] = forms.CharField(max_length=200, widget=forms.TextInput())
