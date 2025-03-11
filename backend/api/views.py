from django.shortcuts import render
from rest_framework import generics
from .models import Blog,Comments
from .serializers import BlogSerializer,CommentsSerializer
from rest_framework.permissions import IsAuthenticated  # Import permission class

class BlogListCreateAPIView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]  # Ensure user is authenticated

      # Auto-assign user
 # Assign logged-in user as blog author
    
class BlogDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    
class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    

# Create your views here.
