'use strict';

var Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

var Comment = Backbone.Model.extend({
    defaults: function() {
        return {
            children: []
        }
    }
});

module.exports = Comment;
