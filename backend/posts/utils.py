from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import SAFE_METHODS
from rest_framework.status import HTTP_403_FORBIDDEN
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Post
from .serializers import PostSerializer, UpdatePostSerializer


class UpdatePostRatingMixin(GenericAPIView):
	"""Base class for updating rating"""

	message = 'You cannot do this'
	drop_rating = False
	raise_rating = False
	restore_rating = False

	lookup_field = 'id'
	queryset = Post.objects.all()
	permission_classes = [IsAuthenticatedOrReadOnly]

	def post(self, request, *args, **kwargs):
		post = self.get_object()

		if self.drop_rating:
			rating = post.drop_rating(request.user)
		elif self.raise_rating:
			rating = post.raise_rating(request.user)
		elif self.restore_rating:
			rating = post.restore_rating(request.user)
		else:
			raise ValueError('One of the parameters must be specified: \
							  drop_rating, raise_rating, restore_rating')

		if rating is False:
			return Response({'detail': self.message},
							status=HTTP_403_FORBIDDEN)
		return Response({'rating': rating})


def get_serializer_class(method):
	# Return post serializer depending on the request method
	if method in SAFE_METHODS:
		return PostSerializer
	return UpdatePostSerializer