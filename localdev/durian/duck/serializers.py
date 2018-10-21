from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Event, Invite, Calendar, Task

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'password')


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'url', 'user')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'url', 'header', 'description', 'startTime', 'endTime', 'recurring', 'private', 'calendar', 'created', 'updated', 'location', 'googleID', 'timezone')

class InviteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Invite
        fields = ('id', 'url', 'organizer', 'invitee', 'event', 'accepted')

class CalendarSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Calendar
        fields = ('id', 'url', 'header', 'owner', 'timezone', 'description', 'googleID')

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'url', 'header', 'description', 'priority', 'duration', 'due', 'owner')
