from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from .serializers import UserSerializer

# Create your views here.
@api_view(['POST'])
@permission_classes([])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=400) 


@api_view(['POST'])
@permission_classes([])
def login_user(request):
    username = request.data.get('username', '').lower()
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    return Response({"error": "Invalid credentials"}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Logs out the user by deleting their authentication token"""
    if hasattr(request.user, 'auth_token'):
        request.user.auth_token.delete()
        return Response({"message": "User logged out"}, status=200)
    return Response({"error": "User is already logged out"}, status=400)


@api_view(['POST'])
def password_reset_request(request):
    """Send password reset email"""
    email = request.data.get('email')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    # Get user by email
    user = User.objects.filter(email=email).first()

    if not user:
        return Response({"error": "User does not exist"}, status=400)

    # Generate token and encoded UID
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    # Build password reset link
    reset_link = request.build_absolute_uri(
        reverse("password_reset_confirm", args=[uid, token])
    )

    # Send reset email
    send_mail(
        subject="Password Reset Request",
        message=f"Click the link to reset your password:\n{reset_link}",
        from_email="your_email@gmail.com",
        recipient_list=[user.email],
        fail_silently=False,
    )

    return Response({"message": "Password reset email sent"}, status=200)

@api_view(['POST'])
@permission_classes([])
def password_reset_confirm(request, uidb64, token):
    """Handle Password Reset Confirmation"""
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (User.DoesNotExist, ValueError, TypeError):
        return Response({"error": "Invalid user"}, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({"error": "Invalid or expired token"}, status=400)

    new_password = request.data.get('new_password')
    if not new_password:
        return Response({"error": "New password is required"}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Password has been reset successfully"}, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    """Get logged in user's profile"""
    user = request.user
    data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }
    return Response(data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    """"Update logged in user's profile"""
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)

    return Response(serializer.errors, status=400)