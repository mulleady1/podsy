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
            'tags/:tagName/':           'tags',
        },
        index: function() {
            $('.card').hide();
            $('#pods-container').show();
        },
        addPod: function() {
            $('#upload').modal();
        },
        pods: function(id) {
            $('.card').hide();
            app.podDetailView.show(app.pods.get(id));
        },
        favPods: function() {
            if (!app.loggedIn) return;
            $('.card').hide();
            $('#pods-container').show();
            app.categoryDetailView.show({ name: 'My favorite pods', description: '' });
            $.get('/pods/favs/').then(function(data) {
                app.pods.reset(data);
            });
        },
        podsByCategory: function(id) {
            $('.card').hide();
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
            $('#category').modal();
        },
        categories: function(id) {
            $('.card').hide();
            $('#categories-container').show();
            if (!app.categories.length) {
                app.categories.fetch({ reset: true });
            }
        },
        signin: function() {
            $('#signin').modal();
        },
        signup: function() {
            $('.card').hide();
            $('#signup-container').show();
        },
        account: function() {
            if (!app.loggedIn) return;
            $('.card').hide();
            $('#account-container').show();
        },
        about: function() {
            $('.card').hide();
            $('#about-container').show();
        },
        tags: function(tagName) {
          $('.card').hide();
          $('#pods-container').show();
          $.get('/tags/{tagName}/'.replace('{tagName}', tagName)).then(function(data) {
              app.categoryDetailView.show({ name: data.name, description: data.description });
              app.pods.reset(data.pods);
          });
        }

    });

    return Router;

});
