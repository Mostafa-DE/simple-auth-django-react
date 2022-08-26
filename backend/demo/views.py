from django.contrib.auth import login, logout
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import permission_classes
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from demo.models import User
from demo.serializer import UserSerializer


@permission_classes((AllowAny,))
class LoginView(KnoxLoginView):
    authentication_classes = []

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        knox_response = super(LoginView, self).post(request, format=None)
        knox_response.set_cookie(
            key='Token',
            value=knox_response.data.get('token'),
            httponly=True,
            samesite='none',
            secure=True
        )
        return knox_response


class RegisterView(APIView):
    @staticmethod
    def post(request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class UserView(APIView):
    @staticmethod
    def get(request):
        user_id = request.user.id
        user = User.objects.filter(id=user_id).first()
        if not user:
            raise AuthenticationFailed('Unauthenticated!')

        if not user.is_active:
            raise AuthenticationFailed('User is not active!')

        serializer = UserSerializer(user)
        return Response(serializer.data)


@permission_classes((AllowAny,))
class LogoutView(KnoxLogoutView):
    authentication_classes = []

    def post(self, request, format=None):
        logout(request)
        response = Response()
        response.delete_cookie(key='Token', samesite='none')
        response.delete_cookie(key='csrftoken', samesite='none')
        return response
