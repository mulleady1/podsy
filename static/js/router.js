define([
    'backbone',
    'collections/subcategories',
    'views/subcategory'
], function(Backbone, Subcategories, SubcategoryView) {
  var Router = Backbone.Router.extend({
    routes: {
      '':                        'index',
      'pods/:id/':               'pods',
      'categories/:id':          'categories',
      'subcategories/:id':       'subcategories',
      'pods/subcategories/:id/': 'podsBySubcategory'
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
    subcategories: function(id) {

    },
    podsBySubcategory: function(id) {
      $.get('/pods/subcategories/{id}/'.replace('{id}', id)).then(function(data) {
        app.pods.reset(data);
      });
    }

  });

  return Router;

});
