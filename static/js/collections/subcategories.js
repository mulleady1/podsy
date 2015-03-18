define([
    'models/subcategory'
], function(Subcategory) {
    'use strict';

    var Subcategories = Backbone.Collection.extend({
        model: Subcategory,
        url: '/subcategories'
    });

    return Subcategories;
});
