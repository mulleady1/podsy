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
            $('.card').hide();
            $('#pods-container').show();
            app.loadInitialPods();
        },
        newPod: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#upload').show();
        },
        podById: function(id) {
            $('.card').hide();
            app.podDetailView.show(app.pods.get(id));
        },
        podsByFav: function() {
            if (!app.loggedIn) return;
            $('.card').hide();
            this.collapseMobileNav();
            $('#pods-container').show();
            app.categoryDetailView.show({ name: 'My favorite pods', description: '' });
            $.get('/account/pods/favs/').then(function(data) {
                app.pods.reset(data);
            });
        },
        podsByCategory: function(name) {
            $('.card').hide();
            this.collapseMobileNav();

            function f() {
                app.categories.each(function(cat) {
                    if (cat.get('name').toLowerCase() == name) {
                        app.categoryDetailView.show(cat.toJSON());
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
            $('#pods-container').show();
            $.get('/pods/categories/{name}/'.replace('{name}', name.toLowerCase())).then(function(data) {
                app.pods.reset(data);
            });
        },
        categories: function() {
            $('.card').hide();
            $('#categories-container').show();
            if (!app.categories.length) {
                app.categories.fetch({ reset: true });
            }
        },
        newCategory: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#category').show();
        },
        signin: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#signin').show();
        },
        signup: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#signup').show();
        },
        account: function() {
            if (!app.loggedIn) return;
            $('.card').hide();
            this.collapseMobileNav();
            $('#account-container').show();
        },
        about: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#about-container').show();
        },
        tags: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#tags-container').show();
            app.tags.fetch({ reset: true });
        },
        tagByName: function(tagName) {
            $('.card').hide();
            $('#pods-container').show();
            $.get('/tags/{tagName}/'.replace('{tagName}', tagName)).then(function(data) {
                app.categoryDetailView.show({ name: data.name, description: data.description });
                app.pods.reset(data.pods);
            });
        },
        tagsByFav: function() {
            if (!app.loggedIn) return;
            $('.card').hide();
            this.collapseMobileNav();
            $('#tags-container').show();
            app.categoryDetailView.show({ name: 'My favorite Tags', description: '' });
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
