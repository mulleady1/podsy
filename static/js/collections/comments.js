'use strict';

var Backbone = require('backbone'),
    Comment = require('../models/Comment');

var Comments = Backbone.Collection.extend({
    model: Comment,
    setPod: function(pod) {
        this.url = '/pods/{id}/comments/'.replace('{id}', pod.get('id'));
        return this;
    }
});

module.exports = Comments;
