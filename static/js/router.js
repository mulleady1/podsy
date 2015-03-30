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
            'categories/new/':         'addCategory',
            'categories/':             'categories',
            'signin':                  'signin'
        },
        index: function() {
            $('#pods-container').show();
            $('#categories-container').hide();
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
        podsByCategory: function(id) {
            $('#pods-container').show();
            $('#categories-container').hide();
            $.get('/pods/categories/{id}/'.replace('{id}', id)).then(function(data) {
                app.pods.reset(data);
            });
        },
        addCategory: function() {
            $('#category').modal();
        },
        categories: function(id) {
            $('#pods-container').hide();
            $('#categories-container').show();
            if (!app.categories.length) {
                app.categories.fetch({ reset: true });
            }
        },
        signin: function() {
            $('#signin').modal();
        }

    });

    return Router;

});
