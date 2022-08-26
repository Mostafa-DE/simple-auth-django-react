from django.contrib import admin
from django.urls import path, include
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


class ProtectedView(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request):
        return Response({'message': 'Hello, World!'})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('demo.urls')),
    path('hello/', ProtectedView.as_view(), name='hello'),
]
