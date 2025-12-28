from rest_framework import serializers
from .models import PersonalDetails, WorkingDetails, StudentDetails

class PersonalDetailsSerializers(serializers.Serializer):
    class Meta:
        model = PersonalDetails
        exclude = ("details",)

class WorkingProfileSerializers(serializers.Serializer):
    class Meta:
        model = WorkingDetails
        exclude = ("details",)

class StudentDetailsSerializers(serializers.Serializer):
    class Meta:
        model = StudentDetails
        exclude = ("details",)