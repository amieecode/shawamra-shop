from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.shortcuts import render

# Create your views here.
class RegisterUser(APIView):
    def post (self, request):
        # Get the data from the frontend (username, email, password)
        username = request.data.get('username')
        email = request.data.get('email')
        password = make_password(request.data.get('password'))

        # create a new user and save it to the database
        user = User.objects.create(username=username, email=email, password=password)
        
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)