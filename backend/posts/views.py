from rest_framework import mixins
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from . import utils
from .models import Post
from .permissions import PostPermission


class PostsView(mixins.ListModelMixin, mixins.CreateModelMixin, GenericAPIView):
	"""Get list of all posts and create a new one"""

	queryset = Post.objects.all()
	permission_classes = [IsAuthenticatedOrReadOnly]

	def get(self, request):
		return self.list(request)

	def post(self, request):
		return self.create(request)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

	def get_serializer_class(self):
		return utils.get_serializer_class(self.request.method)


class PostView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
			   mixins.DestroyModelMixin, GenericAPIView):
	"""Get, update and destroy post by id"""

	lookup_field = 'id'
	queryset = Post.objects.all()
	permission_classes = [PostPermission]

	def get(self, request, *args, **kwargs):
		response = self.retrieve(request, *args, **kwargs)
		post = self.get_object()
		post.views += 1
		post.save()
		return response

	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)

	def delete(self, request, *args, **kwargs):
		return self.destroy(request, *args, **kwargs)

	def get_serializer_class(self):
		return utils.get_serializer_class(self.request.method)


class DropRating(utils.UpdatePostRatingMixin):
	"""Drop rating of the post by id"""

	drop_rating = True
	message = 'You cannot drop the rating twice'


class RaiseRating(utils.UpdatePostRatingMixin):
	"""Raise rating of the post by id"""

	raise_rating = True
	message = 'You cannot raise the rating twice'


class RestoreRating(utils.UpdatePostRatingMixin):
	"""Restore vote at rating of the post by id"""

	restore_rating = True
	message = 'You cannot restore vote if you did not vote'