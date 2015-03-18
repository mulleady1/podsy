define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var SubcategoryView = Backbone.View.extend({
        events: {
            'click a.name': 'subcategoryClicked'
        },
        subcategoryClicked: function(event) {
            event.preventDefault();
            app.router.navigate(event.target.pathname, true);
        }
    });

    return SubcategoryView;
});
