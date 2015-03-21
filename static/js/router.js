define([
    'backbone',
    'collections/subcategories',
    'views/subcategory'
], function(Backbone, Subcategories, SubcategoryView) {
  var Router = Backbone.Router.extend({
    routes: {
      '/':                      'index',
      'pods/:id':               'pods',
      'categories/:id':         'categories',
      'subcategories/:id':      'subcategories',
      'pods/subcategories/:id': 'podsBySubcategory'
    },
    index: function() {
      alert('index');
    },
    pods: function(id) {

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
