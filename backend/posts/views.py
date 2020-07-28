from rest_framework import mixins
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Post
from .serializers import PostSerializer
from .permissions import PostPermission


class PostsView(mixins.ListModelMixin, mixins.CreateModelMixin, GenericAPIView):
	"""Getting list of all posts and creating a new one"""

	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permission_classes = [IsAuthenticatedOrReadOnly]

	def get(self, request):
		return self.list(request)

	def post(self, request):
		return self.create(request)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)


class PostView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
			   mixins.DestroyModelMixin, GenericAPIView):
	"""Getting, update and destroy post by id"""

	lookup_field = 'id'
	queryset = Post.objects.all()
	serializer_class = PostSerializer
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

