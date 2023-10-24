import os
from django import setup
from derbtable.Serializers import categorySerializer, numberQuestionSerializer


def category_processor(data):
    serializer = categorySerializer(data=data)
    if serializer.is_valid():
     print(data['title'])
    else:
        context['has_errors']=True
        data['error'] = 'empty title'
def number_processor(data,context):
    serializer = numberQuestionSerializer(data=data)
    if serializer.is_valid():
        print(serializer.validated_data['description'])
    else:
        context['has_errors'] = True
        data['error'] = 'empty title'
def booleaan_processor(data,context):
    print(data['class'])
def condition_processor(data,context):
    print(data['evaluate'])
class_processor={
    'category': category_processor,
    'number': number_processor,
    'boolean': booleaan_processor,
    'condition': condition_processor,
}


form = {
    'config': {
        'id': 1
    },
    'data': [
        {
            'class': 'category',
            'title': 'my category',
            'children': [
                         {
                            'class': 'category',
                            'title': 'subcategory',
                            'children': [  #lista de preguntas
                                {
                                   'class': 'number',#type
                                   'description': 'test description',
                                   'placeholder': 'test',
                                   'minlength': 0,
                                   'maxlength': 0,
                                   'step': 0.1,
                                   'required': False,
                                   'children': [
                                              {
                                                  'class': 'condition',
                                                  'evaluate': '',
                                                  'children': [{

                                                  }]#more questions
                                              }
                                            ]
                                },
                                {
                                    'class': 'checkbox',  # type
                                    'description': 'test description',
                                    'placeholder': 'test',
                                    'minlength': 0,
                                    'maxlength': 0,
                                    'step': 0.1,
                                    'required': False,
                                    'children': [
                                        {
                                            'class': 'condition',
                                            'evaluate': '',
                                            'children': [{

                                            }]  # more questions
                                        }
                                    ]
                                },
                                {
                                    'class': 'radiobutton',  # type
                                    'description': 'test description',
                                    'placeholder': 'test',
                                    'minlength': 0,
                                    'maxlength': 0,
                                    'step': 0.1,
                                    'required': False,
                                    'children': [
                                        {
                                            'class': 'condition',
                                            'evaluate': '',
                                            'children': [{

                                            }]  # more questions
                                        }
                                    ]
                                }

                            ]
                         },
                       ]
        }
    ]
}

def process_children(children,context):
    for child in children:
        if 'class' in child:
            klass_processor = class_processor[child['class']]
            klass_processor(child,context)
            if 'children' in child:
                process_children(child['children'],context)
def process_forms(form):
    context={'has_erros': False}
    process_children(form['data'],context)
    return context

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE','derbtable.settings')
    setup()
    context = process_forms(form)
    print(form)

