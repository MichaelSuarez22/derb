# Generated by Django 4.2.5 on 2023-10-15 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('derbtable', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Formulario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('questions', models.ManyToManyField(related_name='formularios', to='derbtable.question')),
            ],
        ),
    ]
