from django.urls import path

from .views import PostsView, PostView
from .views import DropRating, RaiseRating, RestoreRating


urlpatterns = [
	path('', PostsView.as_view(), name='posts_view'),
	path('<int:id>/', PostView.as_view(), name='post_view'),
	path('<int:id>/drop_rating/', DropRating.as_view(), name='drop_rating'),
	path('<int:id>/raise_rating/', RaiseRating.as_view(), name='raise_rating'),
	path('<int:id>/restore_rating/', RestoreRating.as_view(), name='restore_rating'),
]