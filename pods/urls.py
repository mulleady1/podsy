from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'podsy.views.home', name='home'),
    url(r'^pods/$', 'podsy.views.pods', name='pods'),
    url(r'^pods/subcategories/(\d+)/$', 'podsy.views.podsBySubcategory', name='podsBySubcategory'),
    url(r'^categories/$', 'podsy.views.categories', name='categories'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
