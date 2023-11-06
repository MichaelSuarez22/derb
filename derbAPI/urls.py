
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from derbtable import views


router = DefaultRouter()
router.register(r'questions', views.QuestionViewSet)
router.register(r'responses', views.ResponseViewSet)
router.register(r'formularios', views.FormularioViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
path('',include('derbtable.urls')),
path('api/', include(router.urls)),
path('responder_preguntas/', views.responder_preguntas, name='responder_preguntas'),
path('derb/', views.derb_view, name='derb_view'),
path('eliminar_respuesta/<int:respuesta_id>/', views.eliminar_respuesta, name='eliminar_respuesta'),
path('ver_preguntas/', views.ver_preguntas, name='ver_preguntas'),

]
