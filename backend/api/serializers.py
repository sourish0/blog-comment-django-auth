from rest_framework import serializers
from .models import Blog,Comments

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    comments = CommentsSerializer(many=True, read_only=True)  # Include nested comments
    class Meta:
        model = Blog
        fields = ['id','title','body','img_url','comments']
        
