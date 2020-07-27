from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import BasePermission


class PostPermission(BasePermission):
	"""Permissions for getting and updating post"""

	def has_permission(self, request, view):
		self.message = 'Для доступа к данной странице необходимо авторизоваться'
		return bool(
			request.method in SAFE_METHODS or 
			request.user.is_authenticated
		)
		

	def has_object_permission(self, request, view, obj):
		self.message = 'Это действие доступно только владульцу данного поста'
		return bool(
			request.method in SAFE_METHODS or
			request.user == obj.user or request.user.is_admin
		)
