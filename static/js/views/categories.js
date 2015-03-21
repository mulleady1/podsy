define([
    'jquery',
    'underscore',
    'backbone',
    'models/category',
    'views/category',
    'collections/categories'
], function($, _, Backbone, Category, CategoryView, Categories) {
    var CategoriesView = Backbone.View.extend({
        initialize: function() {
            app.categories = new Categories();
            _.each($('#categories > li'), function(li) {
                var category = new Category({
                    id: $(li).find('a.name').attr('data-id'),
                    name: $(li).find('a.name').html()
                });
                app.categories.add(category);
                var categoryView = new CategoryView({
                    el: li,
                    model: category
                });
            });
        }
    });

    return CategoriesView;
});
