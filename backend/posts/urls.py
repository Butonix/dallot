from django.urls import path

from .views import PostsView, PostView


urlpatterns = [
	path('', PostsView.as_view(), name='posts_view'),
	path('<int:id>/', PostView.as_view(), name='post_view'),
]