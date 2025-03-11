from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=50,unique=True)
    body = models.TextField(null=False)
    img_url = models.URLField(default='')
    
    def __str__(self):
        return self.title

class Comments(models.Model):
    comment = models.TextField(null=False)
    blog = models.ForeignKey(Blog,on_delete=models.CASCADE,related_name="comments",)

