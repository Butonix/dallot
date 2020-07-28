from django.db import models

from account.models import User


class Post(models.Model):
	"""Model of post (article)"""

	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
	title = models.CharField(max_length=250)
	text = models.TextField()
	date_created = models.DateTimeField(auto_now_add=True)
	views = models.IntegerField(default=0)
	rating = models.IntegerField(default=0)
	dropped_rating_users = models.ManyToManyField(User, null=True, blank=True, related_name='dropped_posts', verbose_name='users who dropped the rating')
	raised_rating_users = models.ManyToManyField(User, null=True, blank=True, related_name='raised_posts', verbose_name='users who raised the rating')
	bookmark_users = models.ManyToManyField(User, null=True, blank=True, related_name='bookmarked_posts', verbose_name='users who bookmarked the post')

	class Meta:
		ordering = ['-date_created']

	def __str__(self):
		return self.title