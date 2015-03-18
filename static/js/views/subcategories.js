define([
    'jquery',
    'underscore',
    'backbone',
    'models/subcategory',
    'views/subcategory',
    'collections/subcategories'
], function($, _, Backbone, Subcategory, SubcategoryView, Subcategories) {
    var SubcategoriesView = Backbone.View.extend({
        initialize: function() {
            app.subcategories = new Subcategories();
            _.each($('#subcategories > li'), function(li) {
                var subcategory = new Subcategory({
                    id: $(li).find('a.name').attr('data-id'),
                    name: $(li).find('a.name').html()
                });
                app.subcategories.add(subcategory);
                var subcategoryView = new SubcategoryView({
                    el: li,
                    model: subcategory
                });
            });
        }
    });

    return SubcategoriesView;
});
