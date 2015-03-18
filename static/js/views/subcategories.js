define([
    'jquery',
    'underscore',
    'backbone',
    'models/subcategory',
    'views/subcategory'
], function($, _, Backbone, Subcategory, SubcategoryView) {
    var SubcategoriesView = Backbone.View.extend({
        initialize: function() {
            _.each($('#subcategories > li'), function(li) {
                var subcategory = new Subcategory({ 
                    name: $(li).find('a.name').html()
                });
                var subcategoryView = new SubcategoryView({ 
                    el: li,
                    model: subcategory 
                });
            });
        }
    });

    return SubcategoriesView;
});
