define([
    'models/tag'
], function(Tag) {
    'use strict';

    var Tags = Backbone.Collection.extend({
        model: Tag,
        url: '/tags/'
    });

    return Tags;
});
