from django.urls import path

from .views import GetAuthToken, GetUserByAuthToken


urlpatterns = [
	path('token/get_auth_token/', GetAuthToken.as_view(), name='get_auth_token'),
	path('token/get_user/', GetUserByAuthToken.as_view(), name='get_user_by_auth_token'),
]
