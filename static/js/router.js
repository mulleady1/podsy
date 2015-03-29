define([
    'backbone',
    'views/category'
], function(Backbone, CategoryView) {
    var Router = Backbone.Router.extend({
        routes: {
            '':                        'index',
            'pods/:id/':               'pods',
            'categories/:id':          'categories',
            'pods/categories/:id/':    'podsByCategory',
            'signin':                  'signin',
            'upload':                  'upload'
        },
        index: function() {
            app.pods.fetch({ reset: true });
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
        categories: function(id) {

        },
        podsByCategory: function(id) {
            $.get('/pods/categories/{id}/'.replace('{id}', id)).then(function(data) {
                app.pods.reset(data);
            });
        },
        signin: function() {
            $('#signin').modal();
        },
        upload: function() {
            $('#upload').modal();
        }

    });

    return Router;

});
