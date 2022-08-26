from knox.auth import TokenAuthentication
from rest_framework import HTTP_HEADER_ENCODING


class CustomAuth(TokenAuthentication):
    def authenticate(self, request):
        auth = request.COOKIES.get('Token', b'')
        if isinstance(auth, str):
            auth = auth.encode(HTTP_HEADER_ENCODING)

        if not auth:
            return None

        user, auth_token = self.authenticate_credentials(auth)
        return user, auth_token
