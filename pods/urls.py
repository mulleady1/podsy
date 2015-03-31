from django.conf.urls import patterns, include, url
from django.contrib import admin
from podsy.views import PodView

urlpatterns = patterns('',
    url(r'^$', 'podsy.views.home'),
    url(r'^signin/$', 'podsy.views.signin'),
    url(r'^pods/$', PodView.as_view()),
    url(r'^pods/(?P<pod_id>\d+)/$', PodView.as_view()),
    url(r'^pods/categories/(?P<category_id>\d+)/$', PodView.as_view()),
    url(r'^categories/$', 'podsy.views.categories'),

    url(r'^admin/', include(admin.site.urls)),
)
