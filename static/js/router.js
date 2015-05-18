define([
    'backbone',
    'views/category'
], function(Backbone, CategoryView) {
    var Router = Backbone.Router.extend({
        routes: {
            '':                        'index',
            'pods/new/':               'addPod',
            'pods/favs/':              'favPods',
            'pods/:id/':               'pods',
            'pods/categories/:id/':    'podsByCategory',
            'pods/subcategories/:id/': 'podsBySubcategory',
            'categories/new/':         'addCategory',
            'categories/':             'categories',
            'signin/':                 'signin',
            'signup/':                 'signup',
            'account/':                'account',
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
            $.get('/pods/favs/').then(function(data) {
                app.pods.reset(data);
            });
        },
        podsByCategory: function(id) {
            $('.card').hide();
            this.collapseMobileNav();
            if (app.categories.length) {
                app.categoryDetailView.show(app.categories.get(id).toJSON());
            } else {
                app.categories.fetch({
                    reset: true,
                    success: function() {
                        app.categoryDetailView.show(app.categories.get(id).toJSON());
                    }
                });
            }
            $('#pods-container').show();
            $.get('/pods/categories/{id}/'.replace('{id}', id)).then(function(data) {
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
        categories: function(id) {
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
            $('#tags-container').show();
            if (app.tags.length == 0) {
                app.tags.fetch({ reset: true });
            }
        },
        tagByName: function(tagName) {
          $('.card').hide();
          $('#pods-container').show();
          $.get('/tags/{tagName}/'.replace('{tagName}', tagName)).then(function(data) {
              app.categoryDetailView.show({ name: data.name, description: data.description });
              app.pods.reset(data.pods);
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
