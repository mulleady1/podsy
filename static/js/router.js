define([
    'backbone',
    'views/category'
], function(Backbone, CategoryView) {
    var Router = Backbone.Router.extend({
        routes: {
            '':                        'index',
            'pods/new/':               'addPod',
            'pods/:id/':               'pods',
            'pods/categories/:id/':    'podsByCategory',
            'pods/subcategories/:id/': 'podsBySubcategory',
            'categories/new/':         'addCategory',
            'categories/':             'categories',
            'signin/':                 'signin',
            'signup/':                 'signup',
            'account/':                'account',
            'account/pods/favs/':      'favPods',
            'account/tags/favs/':      'favTags',
            'about/':                  'about',
            'tags/':                   'tags',
            'tags/:tagName/':          'tagByName'
        },
        index: function() {
            $('.card').hide();
            $('#pods-container').show();
            app.loadInitialPods();
        },
        addPod: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#upload').show();
        },
        pods: function(id) {
            $('.card').hide();
            app.podDetailView.show(app.pods.get(id));
        },
        favPods: function() {
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
        podsBySubcategory: function(id) {
            $('.card').hide();
            if (app.subcategories.length) {
                app.categoryDetailView.show(app.subcategories.get(id).toJSON());
            } else {
                app.subcategories.fetch({
                    reset: true,
                    success: function() {
                        app.categoryDetailView.show(app.subcategories.get(id).toJSON());
                    }
                });
            }
            $('#pods-container').show();
            $.get('/pods/subcategories/{id}/'.replace('{id}', id)).then(function(data) {
                app.pods.reset(data);
            });
        },
        addCategory: function() {
            $('.card').hide();
            this.collapseMobileNav();
            $('#category').show();
        },
        categories: function() {
            $('.card').hide();
            $('#categories-container').show();
            if (!app.categories.length) {
                app.categories.fetch({ reset: true });
            }
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
        favTags: function() {
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
