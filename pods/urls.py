from django.conf.urls import patterns, include, url
from django.contrib import admin
from podsy.views import *
from messaging.views import *

urlpatterns = patterns('',
    url(r'^$', 'podsy.views.home'),
    url(r'^signin/$', SigninView.as_view()),
    url(r'^signup/$', SignupView.as_view()),
    url(r'^signout/$', SignoutView.as_view()),
    url(r'^pods/$', PodView.as_view()),
    url(r'^pods/page/(?P<page>\d+)/$', PodView.as_view()),
    url(r'^account/pods/favs/$', PodView.as_view(favs=True)),
    url(r'^pods/(?P<pod_id>\d+)/$', PodView.as_view()),
    url(r'^pods/categories/(?P<category_name>\w+)/$', PodView.as_view()),
    url(r'^pods/categories/(?P<category_name>\w+)/page/(?P<page>\d+)/$', PodView.as_view()),
    url(r'^pods/tags/(?P<tag_id>\d+)/$', TagView.as_view()),
    url(r'^pods/tags/(?P<tag_name>[a-z0-9-]+)/$', TagView.as_view()),
    url(r'^pods/tags/(?P<tag_id>\d+)/page/(?P<page>\d+)/$', TagView.as_view()),
    url(r'^pods/tags/(?P<tag_name>[a-z0-9-]+)/page/(?P<page>\d+)/$', TagView.as_view()),
    url(r'^categories/$', CategoryView.as_view()),
    url(r'^comments/$', CommentView.as_view()),
    url(r'^pods/(?P<pod_id>\d+)/comments/$', CommentView.as_view()),
    url(r'^comments/(?P<comment_id>\d+)/$', CommentView.as_view()),
    url(r'^tags/$', TagView.as_view()),
    url(r'^account/tags/favs/$', TagView.as_view(favs=True)),
    url(r'^users/(?P<username>[a-zA-Z0-9_]+)/$', UserView.as_view()),
    url(r'^messages/$', MessageView.as_view()),
    url(r'^messages/(?P<message_id>\d+)/$', MessageView.as_view()),
    url(r'^conversations/$', ConversationView.as_view()),
    url(r'^conversations/(?P<conversation_id>\d+)/$', ConversationView.as_view()),
    url(r'^conversations/(?P<conversation_id>\d+)/messages/$', MessageView.as_view()),

    url(r'^admin/', include(admin.site.urls)),
)
