from django.conf.urls import patterns, include, url
from django.contrib import admin
from podsy.views import *

urlpatterns = patterns('',
    url(r'^$', 'podsy.views.home'),
    url(r'^signin/$', SigninView.as_view()),
    url(r'^signup/$', SignupView.as_view()),
    url(r'^signout/$', SignoutView.as_view()),
    url(r'^pods/$', PodView.as_view()),
    url(r'^pods/(?P<pod_id>\d+)/$', PodView.as_view()),
    url(r'^pods/categories/(?P<category_id>\d+)/$', PodView.as_view()),
    url(r'^pods/subcategories/(?P<subcategory_id>\d+)/$', PodView.as_view()),
    url(r'^categories/$', CategoryView.as_view()),

    url(r'^admin/', include(admin.site.urls)),
)
