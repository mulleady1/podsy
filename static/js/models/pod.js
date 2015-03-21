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
        listen: function() {
            this.trigger('listen');
        }
    });

    return Pod;
});
