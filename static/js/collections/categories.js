define([
    'models/category'
], function(Category) {
    'use strict';

    var Categories = Backbone.Collection.extend({
        model: Category,
        url: '/categories'
    });

    return Categories;
});

