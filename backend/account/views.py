from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from . import utils
from .models import User
from .serializers import UserSerializer


class GetAuthToken(APIView):
	"""Get authentication JWT and user by username and password"""

	def post(self, request):
		username = request.data.get('username')
		password = request.data.get('password')

		if not username or not password:
			return Response({'detail': 'Request must have \'username\' and \'password\''},
							status=HTTP_400_BAD_REQUEST)

		user = authenticate(username=username, password=password)
		if not user:
			return Response({'detail': 'Username or password are invalid'},
							status=HTTP_400_BAD_REQUEST)
		serializer = UserSerializer(user)

		return Response({
			'token': utils.get_auth_token(user.id),
			'user': serializer.data,
		})


class GetUserByAuthToken(APIView):
	"""Return user if authentication token is valid or error"""

	def post(self, request):
		token = request.data.get('token')
		if not token:
			return Response({'detail': 'Request must have \'token\''},
							status=HTTP_400_BAD_REQUEST)

		user_id = utils.decode_auth_token(token)
		if not user_id:
			return Response({'detail': 'Token is invalid or expired'},
							status=HTTP_400_BAD_REQUEST)

		try:
			user = User.objects.get(id=user_id)
		except User.DoesNotExist:
			return Response({'detail': 'Token is invalid'},
							status=HTTP_400_BAD_REQUEST)

		serializer = UserSerializer(user)
		return Response(serializer.data)