define([
    'backbone'
], function(Backbone) {
    'use strict';

    var Pod = Backbone.Model.extend({
        toggleUpvote: function() {
            console.log('pod.toggleUpvote');
        },
        toggleDownvote: function() {
            console.log('pod.toggleDownvote');
        },
        toggleFavorite: function() {
            this.set('fav', !this.get('fav'));
            this.save();
        },
        listen: function() {
            this.trigger('listen');
        }
    });

    return Pod;
});
