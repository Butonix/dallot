from django.test import TestCase

from account.models import User

from .models import Post
from .serializers import UpdatePostSerializer


class PostRatingTest(TestCase):
	@classmethod
	def setUpTestData(cls):
		user = User.objects.create(username='username', password='password',
								   email='email@yandex.ru')
		Post.objects.create(user=user, title='Test post', content='Test post')

	def setUp(self):
		self.post = Post.objects.get(id=1)

	def test_drop_post_rating(self):
		rating = self.post.drop_rating(self.post.user)
		self.assertEquals(rating, -1)

	def test_raise_post_rating(self):
		rating = self.post.raise_rating(self.post.user)
		self.assertEquals(rating, 1)

	def test_drop_and_restore_post_rating(self):
		self.post.drop_rating(self.post.user)
		rating = self.post.restore_rating(self.post.user)
		self.assertEquals(rating, 0)

	def test_raise_and_restore_post_rating(self):
		self.post.raise_rating(self.post.user)
		rating = self.post.restore_rating(self.post.user)
		self.assertEquals(rating, 0)

	def test_double_drop_rating(self):
		self.post.drop_rating(self.post.user)
		rating = self.post.drop_rating(self.post.user)
		self.assertFalse(rating)

	def test_double_raise_rating(self):
		self.post.raise_rating(self.post.user)
		rating = self.post.raise_rating(self.post.user)
		self.assertFalse(rating)

	def test_double_restore_rating(self):
		self.post.restore_rating(self.post.user)
		rating = self.post.restore_rating(self.post.user)
		self.assertFalse(rating)


class CreatePostTest(TestCase):
	@classmethod
	def setUpTestData(cls):
		User.objects.create(username='username', password='password',
							email='email@yandex.ru')

	def test_create_post(self):
		user = User.objects.get(id=1)
		serializer = UpdatePostSerializer(data={'user': user.id, 'title': 'Test post',
										  'content': 'Test post'})
		self.assertTrue(serializer.is_valid())
		serializer.save()