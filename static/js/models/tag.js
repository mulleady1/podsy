define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Tag = Backbone.Model.extend({
        defaults: function() {
            return {
                id: null,
                name: '',
                description: '',
                pods: [],
                fav: false
            }
        },
        toggleFavorite: function() {
            debugger;
        }
    });

    return Tag;
});
