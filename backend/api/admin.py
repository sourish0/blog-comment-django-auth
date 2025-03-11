from django.contrib import admin
from .models import Blog, Comments  # Ensure 'Comment' is used, not 'Comments'

admin.site.register(Blog)
admin.site.register(Comments)
