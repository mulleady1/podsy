from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'^$', 'podsy.views.home'),
    url(r'^signin/$', 'podsy.views.signin'),
    url(r'^pods/$', 'podsy.views.pods'),
    url(r'^pods/subcategories/(\d+)/$', 'podsy.views.pods'),
    url(r'^categories/$', 'podsy.views.categories'),

    url(r'^admin/', include(admin.site.urls)),
)
