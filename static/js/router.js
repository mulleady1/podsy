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
        },
        index: function() {
            $('.card').hide();
            $('#pods-container').show();
            app.pods.fetch({ reset: true });
        },
        addPod: function() {
            $('#upload').modal();
        },
        pods: function(id) {
            if (!app.pods.length) {
                app.pods.fetch({
                    reset: true,
                    success: function() {
                        var pod = app.pods.get(id);
                        pod.listen();
                    }
                });
            }
        },
        favPods: function() {
            if (!app.loggedIn) return;
            $('.card').hide();
            $('#pods-container').show();
            $.get('/pods/favs/').then(function(data) {
                app.pods.reset(data);
            });
        },
        podsByCategory: function(id) {
            $('.card').hide();
            if (app.categories.length) {
                var view = app.categoryDetailView.render(app.categories.get(id).toJSON());
                view.$el.insertBefore('#pods-container');
            } else {
                app.categories.fetch({
                    reset: true,
                    success: function() {
                        var view = app.categoryDetailView.render(app.categories.get(id).toJSON());
                        view.$el.insertBefore('#pods-container');
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
                var view = app.categoryDetailView.render(app.subcategories.get(id).toJSON());
                view.$el.insertBefore('#pods-container');
            } else {
                app.subcategories.fetch({
                    reset: true,
                    success: function() {
                        var view = app.categoryDetailView.render(app.subcategories.get(id).toJSON());
                        view.$el.insertBefore('#pods-container');
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
        }

    });

    return Router;

});
