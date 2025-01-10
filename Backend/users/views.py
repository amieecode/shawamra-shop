from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializers, LoginSerializers

# Create your views here.
class RegisterUser(APIView):
    def post (self, request):
        # Use the serializers to validate and process data
        serializers = UserSerializers(data=request.data)

        # Check if the data is valid
        if serializers.is_valid():
            # Save the new user
            serializers.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        
        # Return validated errors
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
    def post (self, request):
        serializers = LoginSerializers(data=request.data)
        if serializers.is_valid():
            # Authenticate  the user 
            user = authenticate (
                username = serializers.validated_data['username'],
                password = serializers.validated_data['password']
            )
            if user:
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credential"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)