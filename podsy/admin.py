from django.contrib import admin
from podsy.models import *

# Register your models here.
admin.site.register(Pod)
admin.site.register(PodsyUser)
admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Comment)
