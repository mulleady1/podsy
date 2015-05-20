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
            'account/tags/favs/':      'tagsByFav'
        },
        index: function() {
            $('.view').hide();
            $('#pods-view').show();
            app.loadInitialPods();
        },
        newPod: function() {
            $('.view').hide();
            this.collapseMobileNav();
            $('#upload').show();
        },
        podById: function(id) {
            $('.view').hide();
            app.podDetailView.show(app.pods.get(id));
        },
        podsByFav: function() {
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
            $('.view').hide();
            $('#categories-view').show();
            if (!app.categories.length) {
                app.categories.fetch({ reset: true });
            }
        },
        newCategory: function() {
            $('.view').hide();
            this.collapseMobileNav();
            $('#category').show();
        },
        signin: function() {
            $('.view').hide();
            this.collapseMobileNav();
            $('#signin').show();
        },
        signup: function() {
            $('.view').hide();
            this.collapseMobileNav();
            $('#signup').show();
        },
        account: function() {
            if (!app.loggedIn) return;
            $('.view').hide();
            this.collapseMobileNav();
            $('#account-view').show();
        },
        about: function() {
            $('.view').hide();
            this.collapseMobileNav();
            $('#about-view').show();
        },
        tags: function() {
            $('.view').hide();
            this.collapseMobileNav();
            $('#tags-view, #tags-view h3.title').show();
            app.tags.fetch({ reset: true });
        },
        tagByName: function(tagName) {
            $('.view').hide();
            $('#pods-view').show();
            $.get('/tags/{tagName}/'.replace('{tagName}', tagName)).then(function(data) {
                app.headerView.show({ name: data.name, description: data.description });
                app.pods.reset(data.pods);
            });
        },
        tagsByFav: function() {
            if (!app.loggedIn) return;
            $('.view').hide();
            this.collapseMobileNav();
            $('#tags-view').show();
            $('#tags-view h3.title').hide();
            app.headerView.show({ name: 'My favorite tags', description: '' });
            $.get('/account/tags/favs/').then(function(data) {
                app.tags.reset(data);
            });
        },
        collapseMobileNav: function() {
            var button = $('button.navbar-toggle[aria-expanded="true"]');
            if (button.length) {
                button.click();
            }
        }

    });

    return Router;

});
