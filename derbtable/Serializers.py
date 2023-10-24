from rest_framework import serializers
from derbtable.models import Question, Response, Formulario


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'


class categorySerializer(serializers.Serializer):
    title = serializers.CharField(required=True)

class numberQuestionSerializer(serializers.Serializer):
    min_value=serializers.IntegerField(required=False)
    max_value = serializers.IntegerField(required=False)
    default_value = serializers.IntegerField(default=0)
    description = serializers.CharField(required=True)


class FormularioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formulario
        fields = '__all__'