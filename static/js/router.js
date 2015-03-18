define([
    'backbone',
    'collections/subcategories',
    'views/subcategory'
], function(Backbone, Subcategories, SubcategoryView) {
  var Router = Backbone.Router.extend({
    routes: {
      '/':                 'index',
      "pods/:id":          "pods",
      "categories/:id":    "categories",
      "subcategories/:id": "subcategories"
    },
    index: function() {
      alert('index');
    },
    pods: function(id) {

    },
    categories: function(id) {

    },
    subcategories: function(id) {
      var subcategory = app.subcategories.get(id);
    }

  });

  return Router;

});
