from django.db import models

from account.models import User


class Post(models.Model):
	"""Model of post (article)"""

	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
	title = models.CharField(max_length=250)
	text = models.TextField()
	date_created = models.DateTimeField(auto_now_add=True)
	likes = models.IntegerField(default=0)
	views = models.IntegerField(default=0)