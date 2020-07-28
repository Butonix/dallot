from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
	"""Serializer for Post model"""

	class Meta:
		model = Post
		fields = ['id', 'user', 'title', 'text', 'date_created', 'views', 'rating']