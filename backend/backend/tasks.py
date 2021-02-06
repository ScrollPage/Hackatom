import datetime as dt

from chat.models import Message
from post.models import Post, Comment

def clean_trash():
    Message.objects.filter(
        timestamp__lte=dt.datetime.now()-dt.timedelta(months=6)
    ).delete()
    Post.objects.filter(
        timestamp__lte=dt.datetime.now()-dt.timedelta(months=6)
    ).delete()
    Comment.objects.filter(
        timestamp__lte=dt.datetime.now()-dt.timedelta(months=6)
    ).delete()