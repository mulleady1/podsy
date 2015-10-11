define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Tag = Backbone.Model.extend({
        url: '/tags/',
        defaults: function() {
            return {
                name: '',
                description: '',
                pods: [],
                fav: false
            }
        },
        toggleFavorite: function() {
            this.set('fav', !this.get('fav'));
            this.save();
        }
    });

    return Tag;
});
