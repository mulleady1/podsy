'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

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

module.exports = User;
