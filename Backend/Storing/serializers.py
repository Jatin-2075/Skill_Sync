from rest_framework import serializers
from .models import *

class DetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetailsTable
        fields = '__all__'

class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalTable
        fields = '__all__'

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillsTable
        fields = '__all__'

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNameTable
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTable
        fields = '__all__'

class ProjectSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectSkillsTable
        fields = '__all__'

class EnrolledSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnrolledTable
        fields = '__all__'