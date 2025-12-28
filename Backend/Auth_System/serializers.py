from rest_framework import serializers
from .models import PersonalDetails, WorkDetails, StudentDetails, PlatfromUsernameDetails

class PersonalDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = PersonalDetails
        exclude = ("details",)

class WorkingProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = WorkDetails
        exclude = ("details",)

class StudentDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = StudentDetails
        exclude = ("details",)


class PlatformUsernameDetailsSerializers(serializers.ModelSerializer):
    class Meta:
        model = PlatfromUsernameDetails
        exclude = ("details",)