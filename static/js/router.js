'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    Pod = require('./models/pod'),
    User = require('./models/user'),
    ContactForm = require('./forms/contact'),
    AccountView = require('./views/account'),
    CategoryView = require('./views/category'),
    ConversationListView = require('./views/conversation-list'),
    MessagesView = require('./views/messages'),
    TagContainer = require('./views/tag-container'),
    UserView = require('./views/user');

var Router = Backbone.Router.extend({
    routes: {
        '':                                'index',
        'pods/new/':                       'newPod',
        'pods/:id/':                       'podById',
        'account/pods/favs/':              'podsByFav',
        'pods/categories/:id/':            'podsByCategory',
        'categories/':                     'categories',
        'categories/new/':                 'newCategory',
        'signin/':                         'signin',
        'signup/':                         'signup',
        'account/':                        'account',
        'about/':                          'about',
        'contact/':                        'contact',
        'thanks/':                         'thanks',
        'tags/':                           'tags',
        'pods/tags/:tagName/':             'tagByName',
        'account/tags/favs/':              'tagsByFav',
        'users/:username/':                'userByUsername',
        'conversations/':                  'conversations',
        'conversations/:param/':           'conversationByParam',
        'messages/':                       'messages'
    },
    initialize: function() {
        this.route(/pods\/.*page\/(\d+)\//, 'pageChange', this.pageChange);
    },
    execute: function(callback, args, name) {
        this.pauseAudio();
        this.collapseMobileNav();
        $('.view').hide();
        callback.apply(this, args);
        return true;
    },
    afterExecute: function() {
        if (app.isMobile()) return;
        $('.view:visible').each(function() {
            $(this).find('input:first').focus();
        });
    },
    index: function() {
        $('#pods-view').show();
        $.get('/pods/').then(function(data) {
            app.pods.reset(data.pods);
            app.trigger('pageChange', { hasNext: data.hasNext, hasPrev: data.hasPrev });
        });
    },
    pageChange: function(num) {
        $('#pods-view').show();
        var url = location.hash.substring(1);
        $.get(url).always(function(data) {
            var pods = data.pods;
            app.pods.reset(pods);
            app.trigger('pageChange', { hasNext: data.hasNext, hasPrev: data.hasPrev });
            if (/\/tags\/|\/categories\//.test(location.hash)) {
                app.headerView.show();
            }
        });
    },
    newPod: function() {
        $('#pod-form-view').show();
    },
    podById: function(id) {
        var pod = app.pods.get(id);
        if (pod) {
            app.podDetailView.show(pod);
        } else {
            $.get('/pods/{id}/'.replace('{id}', id)).then(function(data) {
                pod = new Pod(data.pods[0]);
                app.podDetailView.show(pod);
            });
        }
    },
    podsByFav: function() {
        if (!app.loggedIn) return;
        $('#pods-view').show();
        app.headerView.show({ name: 'My favorite pods', description: '' });
        $.get('/account/pods/favs/').then(function(data) {
            app.pods.reset(data.pods);
            app.trigger('pageChange', { hasNext: data.hasNext, hasPrev: data.hasPrev });
        });
    },
    podsByCategory: function(name) {
        function f() {
            app.categories.each(function(cat) {
                if (cat.get('name').toLowerCase() == name) {
                    app.headerView.show(cat.toJSON());
                    return false;
                }
            });
        }

        if (app.categories.length) {
            f();
        } else {
            app.categories.fetch({
                reset: true,
                success: f
            });
        }
        $('#pods-view').show();
        $.get('/pods/categories/{name}/'.replace('{name}', name.toLowerCase())).then(function(data) {
            app.pods.reset(data.pods);
            app.trigger('pageChange', { hasNext: data.hasNext, hasPrev: data.hasPrev });
        });
    },
    categories: function() {
        $('#categories-view').show();
        if (!app.categories.length) {
            app.categories.fetch({ reset: true });
        }
    },
    newCategory: function() {
        $('#category-view').show();
    },
    signin: function() {
        $('#signin-view').show();
    },
    signup: function() {
        $('#signup-view').show();
    },
    account: function() {
        if (!app.loggedIn) return;
        if (!app.accountView) {
            app.accountView = new AccountView();
        }
        app.accountView.show();
    },
    about: function() {
        $('#about-view').show();
    },
    contact: function() {
        if (!app.contactForm) {
            app.contactForm = new ContactForm();
        }
        app.contactForm.show();
    },
    thanks: function() {
        $('#thanks-view').show();
    },
    tags: function() {
        if (!app.tagContainer) {
            app.tagContainer = new TagContainer();
        }
        $('#tags-view h3.title').html('Tags');
        $.get('/tags/').then(function(data) {
            app.tagContainer.show(data);
        });
    },
    tagByName: function(tagName) {
        $('#pods-view').show();
        $.get('/pods/tags/{tagName}/'.replace('{tagName}', tagName)).then(function(data) {
            app.headerView.show({ name: data.name, description: data.description });
            app.pods.reset(data.pods);
            app.trigger('pageChange', { hasNext: data.hasNext, hasPrev: data.hasPrev });
        });
    },
    tagsByFav: function() {
        if (!app.loggedIn) return;
        if (!app.tagContainer) {
            app.tagContainer = new TagContainer();
        }
        $('#tags-view h3.title').html('My favorite tags');
        $.get('/account/tags/favs/').then(function(data) {
            app.tagContainer.show(data);
        });
    },
    userByUsername: function(username) {
        $.get('/users/{username}/'.replace('{username}', username)).then(function(data) {
            if (!app.userView) app.userView = new UserView();
            app.userView.show(new User(data));
        });
    },
    conversationByParam: function(param) {
        if (!app.loggedIn) return;
        if (!app.messagesView) {
            app.messagesView = new MessagesView();
        }
        app.messagesView.show();
        if (/^\d+$/.test(param)) {
            this.conversationById(param);
        } else {
            this.conversationByUsername(param);
        }
    },
    conversationById: function(id) {
        app.messagesView.showConversation(id);
    },
    conversationByUsername: function(username) {
        app.messagesView.showConversationOrStartNew(username);
    },
    messages: function() {
        if (!app.loggedIn) return;
        if (!app.messagesView) {
            app.messagesView = new MessagesView();
        }
        app.messagesView.show();
    },
    collapseMobileNav: function() {
        var button = $('button.navbar-toggle[aria-expanded="true"]');
        if (button.length) {
            button.click();
        }
    },
    pauseAudio: function() {
        var audioEl = app.podDetailView.audioEl;
        if (audioEl) {
            audioEl.pause();
        }
    }
});

module.exports = Router;
