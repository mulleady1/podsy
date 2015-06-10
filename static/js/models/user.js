define([
    'backbone'
], function(Backbone) {
    'use strict';

    var User = Backbone.Model.extend({
        defaults: function() {
            return {
                username: '',
                pods: [],
                comments: [],
                favoritePods: [],
                favoriteTags: [],
                upvotedPods: [],
                downvotedPods: [],
                created: '',
                isAdmin: false
            }
        }
    });

    return User;
});
