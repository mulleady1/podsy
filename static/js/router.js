define([
    'backbone',
    'views/category',
    'views/user',
    'views/account',
    'views/conversation-list',
    'views/messages',
    'models/user',
], function(Backbone, CategoryView, UserView, AccountView, ConversationListView, MessagesView, User) {
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
        },
        afterExecute: function() {
            if (app.isMobile()) return;
            $('.view:visible').each(function() {
                $(this).find('input:first').focus();
            });
        },
        index: function() {
            $('#pods-view').show();
            app.loadInitialPods();
        },
        pageChange: function(num) {
            $('#pods-view').show();
            var url = location.hash.substring(1);
            $.get(url).always(function(data) {
                app.pods.reset(data);
                app.trigger('pageChange', data.length);
                if (/\/tags\/|\/categories\//.test(location.hash)) {
                    app.headerView.show();
                }
            });
        },
        newPod: function() {
            $('#pod-form-view').show();
        },
        podById: function(id) {
            app.podDetailView.show(app.pods.get(id));
        },
        podsByFav: function() {
            if (!app.loggedIn) return;
            $('#pods-view').show();
            app.headerView.show({ name: 'My favorite pods', description: '' });
            $.get('/account/pods/favs/').then(function(data) {
                app.pods.reset(data);
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
                app.pods.reset(data);
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
        tags: function() {
            $('#tags-view').show();
            $('#tags-view h3.title').html('Tags');
            app.tags.fetch({ reset: true });
        },
        tagByName: function(tagName) {
            $('#pods-view').show();
            $.get('/tags/{tagName}/'.replace('{tagName}', tagName)).then(function(data) {
                app.headerView.show({ name: data.name, description: data.description });
                app.pods.reset(data.pods);
            });
        },
        tagsByFav: function() {
            if (!app.loggedIn) return;
            $('#tags-view').show();
            $('#tags-view h3.title').html('My favorite tags');
            $.get('/account/tags/favs/').then(function(data) {
                app.tags.reset(data);
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

    return Router;

});
