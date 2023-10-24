# Generated by Django 4.2.5 on 2023-10-24 09:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('derbtable', '0003_respuesta'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='response',
            name='date_response',
        ),
        migrations.AddField(
            model_name='question',
            name='condicion',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='descripcion',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='response',
            name='condicion',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='response',
            name='descripcion',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='QuestionOption',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='derbtable.question')),
            ],
        ),
    ]