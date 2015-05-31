define([
    'backbone',
    'views/category'
], function(Backbone, CategoryView) {
    var Router = Backbone.Router.extend({
        routes: {
            '':                        'index',
            'pods/new/':               'newPod',
            'pods/:id/':               'podById',
            'account/pods/favs/':      'podsByFav',
            'pods/categories/:id/':    'podsByCategory',
            'categories/':             'categories',
            'categories/new/':         'newCategory',
            'signin/':                 'signin',
            'signup/':                 'signup',
            'account/':                'account',
            'about/':                  'about',
            'tags/':                   'tags',
            'tags/:tagName/':          'tagByName',
            'account/tags/favs/':      'tagsByFav',
            'users/:username/':        'userByUsername'
        },
        index: function() {
            this.pauseAudio();
            $('.view').hide();
            $('#pods-view').show();
            app.loadInitialPods();
        },
        newPod: function() {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();
            $('#upload-view').show();
        },
        podById: function(id) {
            this.pauseAudio();
            $('.view').hide();
            app.podDetailView.show(app.pods.get(id));
        },
        podsByFav: function() {
            this.pauseAudio();
            if (!app.loggedIn) return;
            $('.view').hide();
            this.collapseMobileNav();
            $('#pods-view').show();
            app.headerView.show({ name: 'My favorite pods', description: '' });
            $.get('/account/pods/favs/').then(function(data) {
                app.pods.reset(data);
            });
        },
        podsByCategory: function(name) {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();

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
                    success: function() {
                        f();
                    }
                });
            }
            $('#pods-view').show();
            $.get('/pods/categories/{name}/'.replace('{name}', name.toLowerCase())).then(function(data) {
                app.pods.reset(data);
            });
        },
        categories: function() {
            this.pauseAudio();
            $('.view').hide();
            $('#categories-view').show();
            if (!app.categories.length) {
                app.categories.fetch({ reset: true });
            }
        },
        newCategory: function() {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();
            $('#category-view').show();
        },
        signin: function() {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();
            $('#signin-view').show();
        },
        signup: function() {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();
            $('#signup-view').show();
        },
        account: function() {
            this.pauseAudio();
            if (!app.loggedIn) return;
            $('.view').hide();
            this.collapseMobileNav();
            $('#account-view').show();
        },
        about: function() {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();
            $('#about-view').show();
        },
        tags: function() {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();
            $('#tags-view').show();
            $('#tags-view h3.title').html('Tags');
            app.tags.fetch({ reset: true });
        },
        tagByName: function(tagName) {
            this.pauseAudio();
            $('.view').hide();
            $('#pods-view').show();
            $.get('/tags/{tagName}/'.replace('{tagName}', tagName)).then(function(data) {
                app.headerView.show({ name: data.name, description: data.description });
                app.pods.reset(data.pods);
            });
        },
        tagsByFav: function() {
            this.pauseAudio();
            if (!app.loggedIn) return;
            $('.view').hide();
            this.collapseMobileNav();
            $('#tags-view').show();
            $('#tags-view h3.title').html('My favorite tags');
            $.get('/account/tags/favs/').then(function(data) {
                app.tags.reset(data);
            });
        },
        collapseMobileNav: function() {
            this.pauseAudio();
            var button = $('button.navbar-toggle[aria-expanded="true"]');
            if (button.length) {
                button.click();
            }
        },
        userByUsername: function(username) {
            this.pauseAudio();
            $('.view').hide();
            this.collapseMobileNav();
            $('#users-view').show();
            $.get('/users/{username}/'.replace('{username}', username)).then(function(data) {
                app.headerView.show({ name: data.username, description: data.description });
                $('#users-view').html('<pre>'+app.toJson(data)+'</pre>');
            });
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
